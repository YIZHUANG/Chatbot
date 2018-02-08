import React, { Component } from "react";
import EditForm from "./editForm";
import FormReview from "./formReview";
import { reduxForm } from "redux-form";

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = { showFormReview: false };
  }

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <FormReview onCancel={() => this.setState({ showFormReview: false })} />
      );
    }

    return (
      <EditForm onSubmit={() => this.setState({ showFormReview: true })} />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "editForm"
})(UpdateUser);
