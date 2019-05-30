import * as React from 'react';
import axios from 'axios';
import ProgressBar from './ProgressBar';
import NavButtons from './NavButtons';
import QA from './QA';

import classes from './App.module.css';
import { Questionnaire, SliderStructure, SliderState } from './types';

interface AppProps {

}

interface AppState {
  currentStepIdx: number,
  sliderStructure: null|SliderStructure,
  sliderState: null|SliderState,
}

interface Quiz {
  sliderStructure: SliderStructure,
  sliderState: SliderState,
};

const defaultAppState: AppState = {
  currentStepIdx: 0,
  sliderStructure: null,
  sliderState: null,
}

type SliderContextUpdateArg = (currentState: AppState) => AppState;
type SliderContextUpdate = (updater: SliderContextUpdateArg) => void

interface SliderContext extends AppState {
  update: SliderContextUpdate|null,
}

const SliderContext = React.createContext<SliderContext>({
  ...defaultAppState,
  update: null,
});



/**
 * Format the questionnaire data into a more usable data structure
 * @param {Object} questionnaire - Raw questionnaire data
 */
function getQuizState(questionnaire: Questionnaire): Quiz {
  let structure: SliderStructure = {
    totalSteps: 0,
    steps: {},
  };
  let state: SliderState = {};

  Object.entries(questionnaire).forEach(([stepName, stepInfo], idx) => {
    const {
      type,
      label,
      option,
      data = null,
      value = null,
    } = stepInfo;

    // Quiz Structure Init
    structure = Object.assign({}, structure, {
      totalSteps: structure.totalSteps + 1,
      steps: Object.assign({}, structure.steps, {
        [idx]: {
          stepId: value || stepName,
          stepName,
          stepLabel: label,
          type,
          data,
          option,
        },
      })
    });

    const isSelectWithMultipleChoices = type === 'select' && !!option['multiple-choice']
    let answerAttributeName: 'value'|'values' = 'value';
    let answerDefaultValue: string|string[] = '';

    switch (type) {
      case 'select': {
        if (isSelectWithMultipleChoices) {
          answerAttributeName = 'values';
          answerDefaultValue = [];
        }
        break;
      }
      default: {
        break;
      }
    }

    // Quiz State Init
    state = Object.assign({}, state, {
      [idx]: {
        answered: false,
        validated: false,
        valid: false,
        [answerAttributeName]: answerDefaultValue,
      },
    });
  });

  return {
    sliderStructure: structure,
    sliderState: state,
  };
}


class App extends React.Component<AppProps, AppState> {
  state: AppState = { ...defaultAppState };

  componentDidMount() {
    axios
      .get(`http://localhost:9888/api/questionnaire`)
      .then((value) => {
        const { sliderState, sliderStructure } = getQuizState(value.data);
        this.setState((currentState) => ({
          ...currentState,
          sliderStructure,
          sliderState,
        }));
      });
  }

  update = (updater: SliderContextUpdateArg) => {
    this.setState(updater);
  }

  render() {
    if (this.state.sliderStructure && this.state.sliderState) {
      return (
        <SliderContext.Provider
          value={{
            ...this.state,
            update: this.update
          }}
        >
          <div className={classes.root}>
            <ProgressBar/>
            <NavButtons
              totalSteps={this.state.sliderStructure.totalSteps}
              currentStepIdx={this.state.currentStepIdx}
              centerRenderer={
                <QA
                  totalSteps={this.state.sliderStructure.totalSteps}
                  currentStepIdx={this.state.currentStepIdx}
                  stepStructure={this.state.sliderStructure.steps[this.state.currentStepIdx]}
                  stepState={this.state.sliderState[this.state.currentStepIdx]}
                />
              }
            />
          </div>
        </SliderContext.Provider>
      );
    }
    return null;
  }


}

export default App;
