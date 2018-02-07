import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import Steppers from "../common/stepper";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Checkbox from "material-ui/Checkbox";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import DatePicker from "material-ui/DatePicker";
import RemoveRedEye from "material-ui/svg-icons/image/remove-red-eye";
import FlatButton from "material-ui/FlatButton";

import SignupFields from "../assets/signupFields";
import LoginFields from "../assets/loginFields";

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

  renderSelectField({ input, label, meta: { touched, error }, children }) {
    return (
      <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
      />
    );
  }

  renderForm() {
    return SignupFields.map(data => (
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

  render() {
    return (
      <div>
        <Steppers />
        <div className="signupForm_container">
          <form
            className="signupForm"
            onSubmit={this.props.handleSubmit(this.props.onEmailSubmit)}
          >
            <div className="file_upload">
              <img
                width="100"
                height="100"
                src="http://shackmanlab.org/wp-content/uploads/2013/07/person-placeholder.jpg"
              />
              <RaisedButton
                label="Choose an Image"
                labelPosition="before"
                style={styles.button}
                containerElement="label"
              >
                <input type="file" style={styles.exampleImageInput} />
              </RaisedButton>
            </div>
            {this.renderForm()}
            <DatePicker hintText="Your birth date" mode="landscape" />
            <Field
              name="height"
              component={this.renderSelectField}
              label="Your height"
            >
              <MenuItem value="1" primaryText="150cm - 170cm" />
              <MenuItem value="2" primaryText="170cm - 190cm" />
              <MenuItem value="3" primaryText="190cm + " />
            </Field>
            <div className="checkbox">
              <Field
                name="hanase"
                component={this.renderCheckbox}
                label="Ysasome?"
              />
            </div>
            <div className="btn-group">
              <Link to="/">
                <RaisedButton label="Cancel" primary={true} />
              </Link>
              <RaisedButton
                className="signup_btn"
                label="Next"
                type="submit"
                icon={<RemoveRedEye />}
                primary={true}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  SignupFields.forEach(item => {
    if (!values[item.name]) {
      errors[item.name] = item.error;
    }
  });

  if (!values["height"]) {
    errors["height"] = "select something";
  }

  if (values["height"] && values["height"] != "3") {
    errors["height"] = "Youassub";
  }

  if (!values["handsome"]) {
    errors["handsome"] = "seasase";
  }

  return errors;
};

const styles = {
  button: {
    margin: 12
  },
  exampleImageInput: {
    cursor: "pointer",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    opacity: 0
  }
};

export default reduxForm({
  form: "signupForm",
  validate,
  destroyOnUnmount: false
})(SignupForm);
