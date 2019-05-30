import * as React from 'react';
import styled from 'styled-components';
import { QAProps } from '../QA';
import SelectFieldOption from './SelectFieldOption';
import classes from './SelectField.module.css';


interface SelectFieldProps extends QAProps {

};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export class SelectField extends React.Component<SelectFieldProps> {
  renderOptions() {
    return this.props.stepStructure.data!.map((option) => (
      <SelectFieldOption
        isSelected={false}
        key={`${this.props.stepStructure.stepId}-${option.value}`}
        label={option.label}
        value={option.value}
      />
    ));
  }

  render() {
    return (
      <Container className={classes.root}>
        {this.renderOptions()}
      </Container>
    );
  }
};
