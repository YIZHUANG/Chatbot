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
      this.props.triggerNextStep({ value: null, trigger: "appointmentBefore" });
    });
  }

  componentDidUpdate() {
    if (
      this.state.response ==
      "Please choose the time slot and location that suits you best"
    ) {
      this.setState({ trigger: true }, () => {
        // this.props.triggerNextStep(null,{ end });
        this.props.triggerNextStep({
          value: null,
          trigger: "appointmentBefore"
        });
      });
    }
  }

  renderSlider() {
    if (this.state.response == "Hi how's it going?") {
      return (
        <div>
          <SliderExampleAxis />
          <button onClick={this.onNext()}>Confirm</button>
        </div>
      );
    }
  }

  triggerNext() {
    this.props.triggerNextStep({ value: null, trigger: "test" });
  }

  render() {
    const { text, response } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <table>
          <tbody>
            <tr>
              <td>{response}</td>
            </tr>
          </tbody>
        </table>
        {this.renderSlider()}
      </div>
    );
  }
}
