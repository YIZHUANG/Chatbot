import React, { Component } from "react";
import axios from "axios";

import ChatBot from "react-simple-chatbot";

import PersonAdd from "material-ui/svg-icons/social/person-add";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import DatePicker from "material-ui/DatePicker";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";

import SliderExampleAxis from "../../common/slider";
import Dialoge from "../../common/dialog";

export default class Appointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      text: "",
      response: "",
      trigger: false
    };
    this.onNext = this.onNext.bind(this);
  }

  componentWillMount() {
    const { steps } = this.props;
    const { message } = steps;
    this.setState({ text: message });
  }

  componentDidMount() {
    let mess = { text: JSON.stringify(this.state.text) };
    axios
      .post("/api/webhook", mess)
      .then(res => this.setState({ response: res.data }));
  }

  onNext() {
    this.setState({ trigger: true }, () => {
      // this.props.triggerNextStep(null,{ end });
      this.props.triggerNextStep({ value: null, trigger: "test" });
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.triggerNextStep();
  };

  triggerNext() {
    this.props.triggerNextStep({ value: null, trigger: "test" });
  }

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ];

    const { text, response } = this.state;
    return (
      <div>
        <RaisedButton primary={true} label="Choose" onClick={this.handleOpen} />
        <Dialog
          title="Choose"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          Choose appointment time and location
          <DatePicker hintText="Date Picker" />
          <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
            <RadioButton key="1" value="Hakaniemi" label="Hakaniemi" />
            <RadioButton key="2" value="Kamppi" label="Kamppi" />
            <RadioButton key="3" value="Pasila" label="Pasila" />
            <RadioButton key="4" value="Espoo" label="Espoo" />
          </RadioButtonGroup>
        </Dialog>
      </div>
    );
  }
}
