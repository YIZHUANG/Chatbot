import React, { Component } from "react";
import EditForm from "./editForm";
import FormReview from "./formReview";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import { fetchUser, logout } from "../../actions";

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

function mapStateToProps(state) {
  const {user} = state.auth;
  return {
    user
  };
}

export default reduxForm({
  form: "editForm"
})(connect(mapStateToProps, { fetchUser })(UpdateUser));
