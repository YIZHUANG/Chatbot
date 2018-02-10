import React, { Component } from "react";
import axios from "axios";

import ChatBot from "react-simple-chatbot";

import PersonAdd from "material-ui/svg-icons/social/person-add";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";

import SliderExampleAxis from "../../common/slider";
import Dialoge from "../../common/dialog";

export default class Consult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      response: ""
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { userInput } = steps;
    this.setState({ text: userInput });
  }

  componentDidMount() {
    let theText = JSON.stringify(this.props.steps.message.value);
    let mess = { text: JSON.stringify(this.state.text) };
    let theMess = { text: theText };
    if (this.props.steps.message.value) {
      axios
        .post("/api/webhook", theMess)
        .then(res => this.setState({ response: res.data }));
    }
    axios
      .post("/api/webhook", mess)
      .then(res => this.setState({ response: res.data }));
  }

  renderResponse() {
    const { response } = this.state;
    if (response == "Bookappointment") {
      return <div>Please type the number 1 to book an appointment</div>;
    } else if (response == "doctor-request") {
      return <div>Please type the number 2 to talk to a doctor</div>;
    } else {
      return response;
    }
  }

  render() {
    const { text, response } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <table>
          <tbody>
            <tr>
              <td>{this.renderResponse()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
