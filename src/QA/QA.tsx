import * as React from 'react';
import styled from 'styled-components';
import InputField from './InputField';
import SelectField from './SelectField';
import classes from './QA.module.css';
import { StepStructure, StepState } from '../types';


export interface QAProps {
  totalSteps: number,
  currentStepIdx: number,
  stepStructure: StepStructure,
  stepState: StepState
};

const QuestionLabel = styled.h4`

`;

export class QA extends React.Component<QAProps> {
  renderField() {
    if (this.props.stepStructure.type === 'select') {
      return (
        <SelectField
          {...this.props}
        />
      );
    }

    return (
      <InputField {...this.props} />
    );
  }

  render() {
    return (
      <div className={classes.root}>
        <QuestionLabel>{this.props.stepStructure.stepLabel}</QuestionLabel>
        {this.renderField()}
      </div>
    );
  }
}
