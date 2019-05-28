import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from './ProgressBar';
import QA from './QA';

import classes from './App.module.css';

/**
 * Format the questionnaire data into a more usable data structure
 * @param {Object} questionnaire - Raw questionnaire data
 */
function getQuizState(questionnaire) {
  let structure = {
    totalSteps: 0,
    steps: {},
  };
  let state = {};

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
          stepName,
          type,
          questionId: value || stepName,
          questionLabel: label,
          data,
          option,
        },
      })
    });

    const isSelectWithMultipleChoices = type === 'select' && !!option['multiple-choice']
    let answerAttributeName = 'value';
    let answerDefaultValue = '';

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
    state,
    structure,
  };
}

function App() {
  const [quiz, setQuiz] = useState({
    currentStepIdx: 0,
    structure: null,
    state: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:9888/api/questionnaire`)
      .then((value) => {
        const quiz = getQuizState(value.data);
        console.log('QUIZ', quiz);
        setQuiz((currentState) => ({
          ...currentState,
          ...quiz,
        }));
      });
  }, []);

  if (!quiz.structure | !quiz.state) {
    return null;
  }


  return (
    <div className={classes.root}>
      <ProgressBar/>
      <QA
        totalSteps={quiz.structure.totalSteps}
        currentStepIdx={quiz.currentStepIdx}
        stepInfo={quiz.structure.steps[`${quiz.currentStepIdx}`]}
        stepState={quiz.state[`${quiz.currentStepIdx}`]}
      />
    </div>
  );
}

export default App;
