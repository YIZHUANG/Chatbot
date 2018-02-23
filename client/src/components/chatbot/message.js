import React, { Component } from "react";
import axios from "axios";

import ChatBot from "react-simple-chatbot";

import PersonAdd from "material-ui/svg-icons/social/person-add";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";

import SliderExampleAxis from "../../common/slider";
import Dialoge from "../../common/dialog";

export default class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      response: "",
      trigger: false
    };
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

  componentDidUpdate() {
    if (this.state.response == "Bookappointment") {
      this.setState({ trigger: true }, () => {
        this.props.triggerNextStep({
          value: null,
          trigger: "appointmentBefore"
        });
      });
    } else if (this.state.response == "doctor-request") {
      this.setState({ trigger: true }, () => {
        this.props.triggerNextStep({
          value: null,
          trigger: "doctorBefore"
        });
      });
    } else if (this.state.response == "doctor-requestt") {
      this.setState({ trigger: true }, () => {
        this.props.triggerNextStep({
          value: null,
          trigger: "doctorBefore"
        });
      });
    } else if (this.state.response == "Type number 4") {
      this.setState({ trigger: true }, () => {
        this.props.triggerNextStep({
          value: null,
          trigger: "beforeSeeAppointment"
        });
      });
    } else {
      this.setState({ trigger: true }, () => {
        this.props.triggerNextStep({
          value: this.state.text,
          trigger: "Consult"
        });
      });
    }
  }

  renderNextButton() {
    const { response } = this.state;
    if (response !== "book-appointment" && response !== "doctor-request") {
      return (
        <button onClick={() => this.props.triggerNextStep()}>continue</button>
      );
    } else {
      return;
    }
  }

  render() {
    const { text, response } = this.state;
    console.log(this.state.response);
    return (
      <div style={{ width: "100%" }}>
        <table>
          <tbody>
            <tr>
              <td>{response}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
