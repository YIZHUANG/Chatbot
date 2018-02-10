import React, { Component } from "react";
import { Link ,withRouter } from "react-router-dom";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";

import { logout } from "../../actions";

import Steppers from "../../common/stepper";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Checkbox from "material-ui/Checkbox";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import DatePicker from "material-ui/DatePicker";
import RemoveRedEye from "material-ui/svg-icons/image/remove-red-eye";
import FlatButton from "material-ui/FlatButton";

import SignupFields from "../../assets/signupFields";
import LoginFields from "../../assets/loginFields";

class EditForm extends Component {
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

  renderSpecialty() {
    return (
      <div className="specialty">
        <Field
          name="specialty"
          component={this.renderSelectField}
          label="Your specialty"
        >
          <MenuItem value="everything" primaryText="i know everything" />
          <MenuItem value="skin" primaryText="skin care" />
          <MenuItem value="eyes" primaryText="eyes" />
          <MenuItem value="ears" primaryText="ears" />
        </Field>
        <RaisedButton
          label="Upload  license"
          labelPosition="before"
          style={styles.button}
          containerElement="label"
        >
          <input type="file" style={styles.exampleImageInput} />
        </RaisedButton>
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
        <div className="signupForm_container">
          <span className="updateProfile">Please update your profile</span>
          <form
            className="signupForm"
            onSubmit={this.props.handleSubmit(this.props.onSubmit)}
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
              name="role"
              component={this.renderSelectField}
              label="Your role"
            >
              <MenuItem value="user" primaryText="Normal user" />
              <MenuItem value="doctor" primaryText="doctor" />
              <MenuItem value="nurse" primaryText="nurse" />
              <MenuItem value="developer" primaryText="developer" />
            </Field>
            {this.props.role === "doctor" || this.props.role === "nurse"
              ? this.renderSpecialty()
              : null}
            <div className="btn-group">
                <RaisedButton label="Cancel" onClick={()=>this.props.logout(this.props.history)} primary={true} />
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

  if (!values["role"]) {
    errors["role"] = "select your role";
  }

  return errors;
};

const styles = {
  button: {
    marginTop: 10
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

EditForm = reduxForm({
  form: "editForm",
  validate,
  destroyOnUnmount: false
})(EditForm);

const selector = formValueSelector("editForm");
EditForm = connect(
  state => {
    // can select values individually
    const username = selector(state, "username");
    const role = selector(state, "role");
    return {
      username,
      role
    };
  },
  { logout }
)(EditForm);

export default withRouter(EditForm);
