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

import LoginForm from './LoginForm';
const Login=()=> {
    return (
      <div>
        <div className="loginForm_container">
          <LoginForm />
          <span className="signup_noti">
            Not a member yet? Join us{" "}
            <Link className="link-to-signup" to="/SignupForm">
              sadad
            </Link>
            <a href="api/google">Google log in</a>
          </span>
        </div>
      </div>
    );
  }

function mapStateToProps(state) {
  return { formValue: state.form.loginForm };
}

export default connect(mapStateToProps,{ signIn })(Login);
