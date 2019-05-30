import * as React from 'react';
import styled from 'styled-components';
import classes from './SelectFieldOptionContainer.module.css';

interface SelectFieldOptionContainerProps {
  isSelected: boolean,
  label: string,
  value: string,
}

const Container = styled.div`

`;

export class SelectFieldOptionContainer extends React.Component<SelectFieldOptionContainerProps> {
  render() {
    return (
      <Container className={classes.root}>
        {this.props.label}
      </Container>
    );
  }
}