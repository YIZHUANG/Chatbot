import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

import LoginForm from "./auth/LoginForm";
import DialogFlow from "../common/chatbot";

import SignupForm from "./auth/SignupForm";

import CommunicationChatBubble from "material-ui/svg-icons/communication/chat-bubble";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { renderSignupForm: false };
  }
  componentDidMount() {
    this.props.fetchUser();
    let mess = { text: JSON.stringify("00000") };
    axios.post("/api/webhook",mess)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user) {
      this.props.history.push("/DashBoard");
    }
  }

  renderAuthForm() {
    if (this.state.renderSignupForm) {
      return (
        <SignupForm
          onCancel={() =>
            this.setState({ renderSignupForm: !this.state.renderSignupForm })
          }
        />
      );
    } else {
      return (
        <LoginForm
          onSignup={() =>
            this.setState({ renderSignupForm: !this.state.renderSignupForm })
          }
        />
      );
    }
  }

  render() {
    return (
      <div className="content_container">
        <div class="container" id="section-1-gradient">
          <div class="row">
            <div class="col-6">
              <div class="leftSide-col">
                <h1 class="large">HEALTHCARE</h1>
                <h1 class="large">YOU DESERVE</h1>
              </div>
              {this.renderAuthForm()}
            </div>
            <div class="col-6">
              <div class="rightSide-col">
                <div class="videoContainer">
                  <iframe id="botFrame"
                    width="450"
                    height="650"
                    src="https://console.dialogflow.com/api-client/demo/embedded/2c5fa8f0-94ed-469e-bcf8-c7a4f66180ec"
                    frameBorder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth
  };
}

export default connect(mapStateToProps, { fetchUser })(Home);
