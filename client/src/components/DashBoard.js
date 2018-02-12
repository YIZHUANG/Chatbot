import React, { Component } from "react";
import { HashRouter, Route, Router, Link } from "react-router-dom";
import { fetchUser, logout } from "../actions";
import { connect } from "react-redux";

import FontIcon from "material-ui/FontIcon";

import CircularProgress from "material-ui/CircularProgress";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

import Chatbot from "./chatbot/chatbot";

import UpdateUser from "./user/updateUser.js";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, renderChatBox: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  componentDidMount() {
    this.props.fetchUser();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.user.username !== nextProps.auth.user.username) {
      this.props.fetchUser();
    }
    if (!nextProps.auth.user) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.user) {
      this.props.history.push("/");
    }

    if (this.props.auth.user&&this.props.auth.user.address != nextProps.auth.user.address) {
      this.props.fetchUser();
    }
  }

  renderDrawer() {
    return (
      <div>
        {" "}
        <RaisedButton label="Open Drawer" onClick={this.handleToggle} />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <MenuItem onClick={this.handleClose}>Dashboard</MenuItem>
          <MenuItem onClick={() => this.props.logout(this.props.history)}>
            Log out
          </MenuItem>
        </Drawer>
      </div>
    );
  }

  renderChatBot() {
    return <Chatbot data={this.props.auth.user} />;
  }

  render() {
    if (!this.props.auth.user) {
      return <CircularProgress />;
    }

    if (!this.props.auth.profile&&!this.props.auth.user.address) {
      return <UpdateUser />;
    }

    return (
      <div>
        <div>{this.renderDrawer()}</div>
        Welcome back!!! {this.props.auth.user.username}
        {this.props.auth.user.address ? this.renderChatBot() : null}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default connect(mapStateToProps, {
  fetchUser,
  logout
})(DashBoard);
