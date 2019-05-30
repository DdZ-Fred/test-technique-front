import * as React from 'react';
import styled from 'styled-components';
import classes from './NavButtons.module.css';


interface NavButtonsProps {
  totalSteps: number,
  currentStepIdx: number,
  centerRenderer: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

const Side = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 50px;
`;

const Center = styled.div`
  flex-grow: 1;
`;

export class NavButtons extends React.Component<NavButtonsProps> {
  renderLeftSideContent() {
    if(this.props.currentStepIdx > 0) {
      return (
        <button>Previous</button>
      );
    }
    return null;
  }

  renderRightSideContent() {
    if (this.props.totalSteps > 1 &&
      this.props.currentStepIdx < this.props.totalSteps -1
    ) {
      return (
        <button>Next</button>
      )
    } else {
      return (
        <button>Submit</button>
      );
    }
  }

  render() {
    return (
      <Container>
        <Side>{this.renderLeftSideContent()}</Side>
        <Center>{this.props.centerRenderer}</Center>
        <Side>{this.renderRightSideContent()}</Side>
      </Container>
    );
  }
}