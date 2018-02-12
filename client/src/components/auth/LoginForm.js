import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { signIn, fetchUser } from "../../actions";

import { withRouter } from "react-router-dom";

import Card, { CardActions, CardHeader, CardContent } from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import AccountCircleIcon from "material-ui-icons/AccountCircle";
import FlatButton from "material-ui/FlatButton";
import FontIcon from "material-ui/FontIcon";
import ActionAndroid from "material-ui/svg-icons/action/android";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import PersonAdd from "material-ui/svg-icons/social/person-add";
import Divider from "material-ui/Divider";

import LoginFields from "../../assets/loginFields";

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
      <Field
        class="inputbox"
        key={data.name}
        name={data.name}
        type={data.type}
        label={data.label}
        component={this.renderMaterialForm}
      />
    ));
  }

  render() {
    return (
      <div className="loginForm_container">
        <form
          onSubmit={this.props.handleSubmit(this.onLogin.bind(this))}
          className="loginForm"
        >
          {this.renderForm()}
          <div className="button_group">
            <RaisedButton
              className="loginForm_btn"
              label="Log in"
              type="submit"
              primary={true}
            />
            <a href="http://health-care-chat-bot.herokuapp.com/api/google">
              <RaisedButton label="Google Log in" primary={true} />
            </a>
          </div>
        </form>
        <div className="login_text">
          <span className="login_fail">{this.props.loginError}</span>
          <span className="signup_noti">
            Don't have an account yet? Register{" "}
            <a
              href=""
              onClick={() => this.setState({ renderSignupForm: true })}
              className="link-to-signup"
            >
              here
            </a>
          </span>
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
  const { loginError, user } = state.auth;
  return {
    formValues: state.form.loginForm,
    loginError,
    user
  };
}

export default reduxForm({
  form: "loginForm",
  validate
})(connect(mapStateToProps, { signIn, fetchUser })(withRouter(LoginForm)));
