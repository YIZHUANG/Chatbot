import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { signIn } from "../actions";

import FlatButton from "material-ui/FlatButton";
import FontIcon from "material-ui/FontIcon";
import ActionAndroid from "material-ui/svg-icons/action/android";
import TextField from "material-ui/TextField";
import Header from "./Header";
import RaisedButton from "material-ui/RaisedButton";
import PersonAdd from "material-ui/svg-icons/social/person-add";
import Divider from "material-ui/Divider";

import LoginFields from "../assets/loginFields";

class LoginForm extends Component {
  renderMaterialForm({ input, label, meta: { error, touched } }) {
    return (
      <TextField
        hintText={label}
        errorText={touched && error}
        floatingLabelText={label}
        {...input}
      />
    );
  }

  onLogin(values) {
    this.props.signIn(values, this.props.history);
  }

  renderForm() {
    return LoginFields.map(data => (
      <div key={data.name}>
        <Field
          name={data.name}
          type={data.type}
          label={data.label}
          component={this.renderMaterialForm}
        />
      </div>
    ));
  }

  render() {
    console.log(this.props.loginError);
    return (
      <div>
        <div className="loginForm_container">
          <form
            onSubmit={this.props.handleSubmit(this.onLogin.bind(this))}
            className="loginForm"
          >
            {this.renderForm()}
            <RaisedButton
              className="loginForm_btn"
              label="Log in"
              type="submit"
              primary={true}
              icon={<PersonAdd />}
            />
          </form>
          {this.props.loginError}
          <span className="signup_noti">
            Not a member yet? Join us{" "}
            <Link className="link-to-signup" to="/SignupForm">
              here
            </Link>
          </span>
          <a href="api/google">Google log in</a>
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  LoginFields.forEach(item => {
    if (!values[item.name]) {
      errors[item.name] = item.error;
    }
  });

  return errors;
};

function mapStateToProps(state) {
  const { loginError } = state.auth;
  return {
    formValues: state.form.loginForm,
    loginError
  };
}

export default reduxForm({
  form: "loginForm",
  validate
})(connect(mapStateToProps, { signIn })(LoginForm));
