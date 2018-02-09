import React, { Component } from "react";
import axios from "axios";

import ChatBot from "react-simple-chatbot";

import PersonAdd from "material-ui/svg-icons/social/person-add";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";

import SliderExampleAxis from "../../common/slider";
import Dialoge from "../../common/dialog";

export default class NormalTalk extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      response: ""
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { normalInput } = steps;
    this.setState({ text: normalInput });
  }

  componentDidMount() {
    let mess = { text: JSON.stringify(this.state.text) };
    axios
      .post("/api/webhook", mess)
      .then(res => this.setState({ response: res.data }));
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
      </div>
    );
  }
}
