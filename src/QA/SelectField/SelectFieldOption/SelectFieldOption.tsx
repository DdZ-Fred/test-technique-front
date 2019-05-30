import * as React from 'react';
import styled from 'styled-components';
import classes from './SelectFieldOption.module.css';

interface SelectFieldOptionProps {
  isSelected: boolean,
  label: string,
  value: string,
}

const Container = styled.div`

`;

export class SelectFieldOption extends React.Component<SelectFieldOptionProps> {
  render() {
    return (
      <Container className={classes.root}>
        {this.props.label}
      </Container>
    );
  }
}