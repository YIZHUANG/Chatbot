import React, { Component } from "react";

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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user) {
      this.props.history.push("/DashBoard");
    }
  }

  render() {
    return (
      <div className="content_container">
        <div class="container" id="section-1-gradient">
          <div class="row">
            {!this.state.renderSignupForm ? (
              <div class="col-6">
                <div class="leftSide-col">
                  <h1 class="large">Best health bot</h1>
                  <h1 class="large">in the world</h1>
                </div>
                <LoginForm />
              </div>
            ) : null}
            {this.state.renderSignupForm ? (
              <div class="col-6">
                <div class="leftSide-col">
                  <h1 class="large">Best health bot</h1>
                  <h1 class="large">in the world</h1>
                </div>
                <SignupForm
                  onCancel={() => this.setState({ renderSignupForm: false })}
                />
              </div>
            ) : null}
            <div class="col-6">
              <div class="rightSide-col">
                <div class="videoContainer">
                  <iframe
                    width="300"
                    height="400"
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
