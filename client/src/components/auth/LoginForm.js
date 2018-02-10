import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { signIn, fetchUser } from "../../actions";

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

  componentWillMount() {
    this.props.fetchUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.username) {
      this.props.history.push("/DashBoard");
    }
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

  renderChatbox() {
    return (
      <iframe
        width="350"
        height="430"
        src="https://console.dialogflow.com/api-client/demo/embedded/2c5fa8f0-94ed-469e-bcf8-c7a4f66180ec"
      />
    );
  }

  render() {
    console.log(this.props.loginError);
    return (
      <div>
        <FontIcon
          onClick={() =>
            this.setState({ renderChatBox: !this.state.renderChatBox })
          }
          className="material-icons"
          style={{ fontSize: 100 }}
        >
          chat bubble outline
        </FontIcon>
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
            <a href="http://mysterious-eyrie-35636.herokuapp.com/api/google">
              <RaisedButton
                className="loginForm_btn"
                label="Google Log in"
                primary={true}
                icon={<PersonAdd />}
              />
            </a>
          </form>
          {this.props.loginError}
          <span className="signup_noti">
            Don't have an account yet? Register {" "}
            <Link className="link-to-signup" to="/SignupForm">
              here
            </Link>
          </span>
        </div>
        {this.state.renderChatBox ? this.renderChatbox() : null}
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
})(connect(mapStateToProps, { signIn, fetchUser })(LoginForm));
