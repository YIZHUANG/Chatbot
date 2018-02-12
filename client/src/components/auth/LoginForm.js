import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { signIn, fetchUser } from "../../actions";

import { withRouter } from "react-router-dom";

import FlatButton from "material-ui/FlatButton";
import FontIcon from "material-ui/FontIcon";
import ActionAndroid from "material-ui/svg-icons/action/android";
import TextField from "material-ui/TextField";
import Header from "../Header";
import RaisedButton from "material-ui/RaisedButton";
import PersonAdd from "material-ui/svg-icons/social/person-add";
import Divider from "material-ui/Divider";

import LoginFields from "../../assets/loginFields";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { renderChatBox: false };
  }


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
          key={data.name}
          name={data.name}
          type={data.type}
          label={data.label}
          component={this.renderMaterialForm}
        />
    ));
  }


  render() {
    console.log(this.props.loginError);
    return (
        <div className="loginForm_container">
          <div className="loginForm_title">Log in form is here.......</div>
          <form
            onSubmit={this.props.handleSubmit(this.onLogin.bind(this))}
            className="loginForm"
          >
            {this.renderForm()}
            <div className="normalLogin">
            <RaisedButton
              className="loginForm_btn"
              label="Log in"
              type="submit"
              className="loginForm_btn"
              primary={true}
              icon={<PersonAdd />}
            />
          </div>
          <div className="googleLogin">
            <a href="http://health-care-chat-bot.herokuapp.com/api/google">
              <RaisedButton
                label="Google Log in"
                primary={true}
                icon={<PersonAdd />}
              />
            </a>
          </div>
          </form>
          {this.props.loginError}
          <span className="signup_noti">
            Don't have an account yet? Register {" "}
            <Link className="link-to-signup" to="/SignupForm">
              here
            </Link>
          </span>
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
