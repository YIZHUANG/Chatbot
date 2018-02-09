import React, { Component } from "react";
import axios from "axios";

import ChatBot from "react-simple-chatbot";

import PersonAdd from "material-ui/svg-icons/social/person-add";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";

import SliderExampleAxis from "../../common/slider";
import Dialoge from "../../common/dialog";

export default class DoctorBox extends Component {

  showModal = () => {
    this.props.showModal();
  };

  closeModal = () => {
    this.props.clostModal();
    this.props.triggerNextStep();
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <RaisedButton
          label="Open"
          primary={true}
          onClick={this.showModal.bind(this)}
        />
        <RaisedButton
          className="openDoctorChat"
          label="Close"
          secondary={true}
          onClick={this.closeModal.bind(this)}
        />
      </div>
    );
  }
}
