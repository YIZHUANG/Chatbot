import React, { Component } from "react";
import { HashRouter, Route, Router, Link } from "react-router-dom";
import { fetchUser } from "../actions";
import { connect } from "react-redux";

import Demo from "./chatbot/index";

import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

import UpdateUser from "./user/updateUser.js";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const steps = [
  {
    id: '0',
    message: 'Welcome to react chatbot!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Bye!',
    end: true,
  },
];
    if (!this.props.auth.user) {
      return (
        <div>
          <div>Loading...</div>
          <div>Wait!!</div>
        </div>
      );
    }
    if (this.props.auth.user.address) {
      const hello="dfsdfsf";
      return (<div><Demo /></div>);
    }
    return (
      <div>
        <div>
          <RaisedButton label="Open Drawer" onClick={this.handleToggle} />
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
            <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
            <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
          </Drawer>
        </div>
        Welcome back!!! {this.props.auth.user.username}
        <UpdateUser />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  const { authenticated } = auth;
  return {
    auth,
    authenticated
  };
}

export default connect(mapStateToProps, {
  fetchUser
})(DashBoard);
