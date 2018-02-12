import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { signUp } from "../../actions";

import Steppers from "../../common/stepper";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Checkbox from "material-ui/Checkbox";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import DatePicker from "material-ui/DatePicker";
import RemoveRedEye from "material-ui/svg-icons/image/remove-red-eye";
import FlatButton from "material-ui/FlatButton";

import LoginFields from "../../assets/loginFields";

class SignupForm extends Component {
  renderTextField({ input, label, meta: { error, touched } }) {
    return (
      <div>
        <TextField
          hintText={label}
          floatingLabelText={label}
          {...input}
          errorText={touched && error}
        />
      </div>
    );
  }

  renderCheckbox = ({ input, label, meta: { touched, error } }) => (
    <div>
      <Checkbox
        label={label}
        checked={input.value ? true : false}
        onCheck={input.onChange}
        errorText={touched && error}
      />
      <div>{touched ? error : ""}</div>
    </div>
  );

  renderForm() {
    return LoginFields.map(data => (
      <div key={data.name}>
        <Field
          name={data.name}
          type={data.type}
          label={data.label}
          component={this.renderTextField}
        />
        <br />
      </div>
    ));
  }

  onSignUp(values) {
    this.props.signUp(values, this.props.history);
  }

  render() {
    return (
      <div className="signupForm_container">
        <form
          className="signupForm"
          onSubmit={this.props.handleSubmit(this.onSignUp.bind(this))}
        >
          {this.renderForm()}
          <div className="checkbox">
            <Field
              name="agreement"
              component={this.renderCheckbox}
              label="Do you agree to your term of service?"
            />
          </div>
          <div className="btn-group">
            <RaisedButton
              onClick={() => this.props.onCancel()}
              label="Cancel"
              primary={true}
            />
            <RaisedButton
              className="signup_btn"
              label="Submit"
              type="submit"
              icon={<RemoveRedEye />}
              primary={true}
            />
          </div>
        </form>
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

  if (!values["agreement"]) {
    errors["agreement"] = (
      <span className="agreement_error">
        "You must agree to your term of service"
      </span>
    );
  }

  return errors;
};

export default reduxForm({
  form: "signupForm",
  validate,
  destroyOnUnmount: false
})(connect(null, { signUp })(withRouter(SignupForm)));
