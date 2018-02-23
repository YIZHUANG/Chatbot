import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signUp, fetchUser, updateProfile } from "../../actions";

import ActionFlightTakeoff from "material-ui/svg-icons/action/flight-takeoff";
import RaisedButton from "material-ui/RaisedButton";
import ActionHome from "material-ui/svg-icons/action/home";
import ContentSend from "material-ui/svg-icons/content/send";
import ContentDrafts from "material-ui/svg-icons/content/drafts";
import LogoutIcon from "material-ui-icons/ExitToApp";
const FormReview = ({
  formValues,
  onCancel,
  history,
  signUp,
  signupError,
  updateProfile,
  user,
  fetchUser,
  onUpdate
}) => {
  const { role, address } = formValues;
  console.log(user);

  const list = (
    <div className="review_entries">
      <label className="review_label">address</label>
      <div className="review_text">{address}</div>
      <label className="review_label">Your role</label>
      <div className="review_text">{role}</div>
    </div>
  );

  const onSubmit = () => {
    updateProfile(formValues, user._id, history);
    onUpdate();
  };

  return (
    <div className="review_container">
      <div className="review_content">
        <h1>Comfirm your entries</h1>
        {list}
        <div className="review_btn">
          <RaisedButton
            primary={true}
            onClick={onCancel}
            label="Previous"
            icon={<LogoutIcon />}
            className="review_btn_cancel"
          />
          <RaisedButton
            primary={true}
            label="Save"
            onClick={() => onSubmit()}
            icon={<ContentSend />}
          />
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { signupError, user } = state.auth;
  return {
    formValues: state.form.editForm.values,
    signupError,
    user
  };
}

export default connect(mapStateToProps, { signUp, updateProfile, fetchUser })(
  withRouter(FormReview)
);
