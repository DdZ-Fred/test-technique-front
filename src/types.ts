export type StepType = 'select'|'input';

export type StepData = Array<{
  label: string,
  value: string,
}>;

export interface StepOption {
  [optionEntry: string]: any,
};

export interface Questionnaire {
  [stepName: string]: {
    type: StepType,
    label: string,
    option: StepOption,
    /** type=input only */
    value?: string,
    /** type=select only */
    data?: StepData,
  }
};

export interface StepStructure {
  stepId: string,
  stepName: string,
  stepLabel: string,
  type: StepType,
  data: StepData|null
  option: StepOption,
};

export interface SliderStructure {
  totalSteps: number,
  steps: {
    [stepIndex: number]: StepStructure
  }
};

export interface StepState {
  answered: boolean,
  validated: boolean,
  valid: boolean,
  /** type=select + MultipleChoice only */
  values?: string[],
  /**
   * type=select + SingleChoice
   * type=input
   */
  value?: string|number,
};

export interface SliderState {
  [stepIndex: number]: StepState,
};