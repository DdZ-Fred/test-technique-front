import * as React from 'react';
import styled from 'styled-components';
import InputField from './InputField';
import SelectField from './SelectField';
import classes from './QA.module.css';


interface QAProps {
  totalSteps: number,
  currentStepIdx: number,
  stepInfo: {
    stepName: string,
    type: 'select'|'input',
    questionId: string,
    questionLabel: string,
    option?: {
      [optionName: string]: string|number
    }
  },
  stepState: {
    answered: boolean,
    validated: boolean,
    valid: boolean,
    values?: string[],
    value?: string,
  }
};

const QuestionLabel = styled.h4`

`;

class QA extends React.Component<QAProps> {
  renderField() {
    if (this.props.stepInfo.type === 'select') {
      return (
        <SelectField
          {...this.props}
        />
      )
    }

    return (
      <InputField {...this.props} />
    );
  }

  render() {
    return (
      <div className={classes.root}>
        <QuestionLabel>{this.props.stepInfo.questionLabel}</QuestionLabel>
        {this.renderField()}
      </div>
    );
  }
}

export default QA;
