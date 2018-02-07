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
  renderMaterialForm({ input, label }) {
    return <TextField hintText={label} floatingLabelText={label} {...input} />;
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
          <span className="signup_noti">
            Not a member yet? Join us{" "}
            <Link className="link-to-signup" to="/SignupForm">
              here
            </Link>
          </span>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { formValues: state.form.loginForm };
}

export default reduxForm({
  form: "loginForm"
})(connect(mapStateToProps, { signIn })(LoginForm));
