import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchUser } from "../actions";

import LoginForm from "./auth/LoginForm";
import DialogFlow from "../common/chatbot";
import UnKnown from "../common/unKnown";
import Footer from "../common/footer";

import CommunicationChatBubble from "material-ui/svg-icons/communication/chat-bubble";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { renderChatBox: false };
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user) {
      this.props.history.push("/DashBoard");
    }
  }

  renderChatbox() {
    return <DialogFlow />;
  }

  render() {
    return (
      <div>
        <div className="content_container">
          <UnKnown />
          <LoginForm />
          <div className="dialogFlow">
            {this.state.renderChatBox
              ? this.renderChatbox()
              : "chatbot in here"}
            <FloatingActionButton
              secondary={true}
              onClick={() =>
                this.setState({ renderChatBox: !this.state.renderChatBox })
              }
            >
              <CommunicationChatBubble />
            </FloatingActionButton>
          </div>
        </div>

        <Footer />
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
