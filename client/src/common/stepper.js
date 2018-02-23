import React from "react";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Select campaign settings...";
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "You're a long way from home sonny jim!";
  }
}

const Steppers = stepIndex => {
  return (
    <div style={{ width: "100%", maxWidth: 700, margin: "auto" }}>
      <Stepper activeStep={getStepContent(stepIndex)}>
        <Step>
          <StepLabel>Fill out your username and password</StepLabel>
        </Step>
        <Step>
          <StepLabel>Sign up!</StepLabel>
        </Step>
        <Step>
          <StepLabel>Do cool things</StepLabel>
        </Step>
      </Stepper>
    </div>
  );
};

export default Steppers;
