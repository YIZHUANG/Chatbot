import React, { Component } from "react";
import SignupForm from "./SignupForm";
import SignupFormReview from "./SignupFormReview";
import { reduxForm } from "redux-form";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { showFormReview: false };
  }

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SignupFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SignupForm
        onEmailSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "signupForm"
})(SignUp);
