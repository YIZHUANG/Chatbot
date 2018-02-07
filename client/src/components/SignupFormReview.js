import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signUp } from "../actions";

import ActionFlightTakeoff from "material-ui/svg-icons/action/flight-takeoff";
import RaisedButton from "material-ui/RaisedButton";
import ActionHome from "material-ui/svg-icons/action/home";
import ContentSend from "material-ui/svg-icons/content/send";
import ContentDrafts from "material-ui/svg-icons/content/drafts";

const SignupFormReview = ({ formValues, onCancel, history, signUp }) => {
  const { firstname, lastname, height, handsome } = formValues;
  const list = (
    <div>
      <label className="review_label">Firstname</label>
      <div className="review_text">{firstname}</div>
      <label className="review_label">LastName</label>
      <div className="review_text">{lastname}</div>
      <label className="review_label">Your height</label>
      <div className="review_text">{height}</div>
    </div>
  );
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
            icon={<ContentDrafts />}
            className="review_btn_cancel"
          />
          <RaisedButton
            primary={true}
            label="Send"
            onClick={()=>signUp(formValues,history)}
            icon={<ContentSend />}
          />
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.signupForm.values };
}

export default connect(mapStateToProps,{ signUp })(withRouter(SignupFormReview));
