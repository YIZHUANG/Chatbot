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
import ApiKeyTable from "../common/apiKeyTable";
import AppintmentTable from "../common/appointmentTable";

import ContentInbox from "material-ui/svg-icons/content/inbox";
import LogoutIcon from "material-ui-icons/ExitToApp";
import List, { ListItem, ListItemText, ListItemIcon } from "material-ui/List";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, renderChatBox: false, showEditForm: false,showAppointment:false };
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

  renderApiTable() {}

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.user) {
      this.props.history.push("/");
    }

    if (
      this.props.auth.user &&
      this.props.auth.user.address != nextProps.auth.user.address
    ) {
      this.props.fetchUser();
    }
  }

  renderDrawer() {
    return (
      <div>
        {" "}
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <List>
            <ListItem
              primaryText="Dashboard"
              leftIcon={<ContentInbox />}
              onClick={() => this.setState({ showEditForm: false,showAppointment:false })}
            />
            <ListItem
              primaryText="Update profile"
              leftIcon={<ContentInbox />}
              onClick={() => this.setState({ showEditForm: true,showAppointment:false })}
            />
            <ListItem primaryText="Appointments" leftIcon={<ContentInbox />} onClick={()=>this.setState({showAppointment:true})} />
            <ListItem
              primaryText="Medical history"
              leftIcon={<ContentInbox />}
            />
            <ListItem primaryText="Medication" leftIcon={<ContentInbox />} />
            <ListItem
              primaryText="Log out"
              leftIcon={<LogoutIcon />}
              onClick={() => this.props.logout(this.props.history)}
            />
          </List>
        </Drawer>
      </div>
    );
  }

  renderChatBot() {
    return <Chatbot data={this.props.auth.user} onShowAppoint={()=>this.setState({showAppointment:true})}  />;
  }

  renderContent() {
    if (this.state.showEditForm) {
      return (
        <UpdateUser onUpdate={() => this.setState({ showEditForm: false })} />
      );
    }
    else if(this.state.showAppointment){
      return <AppintmentTable />
    }
    return <ApiKeyTable />;
  }

  render() {
    if (!this.props.auth.user) {
      return <CircularProgress />;
    }

    return (
      <div className="dashBoard">
        <AppBar title="Welcome back!" onLeftIconButtonClick={this.handleToggle} />
        <div className="auth_content">
          <div className="drawer">{this.renderDrawer()}</div>
          {this.renderContent()}
        </div>
        <div className="chat_bot">
          {this.props.auth.user ? this.renderChatBot() : null}
        </div>
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
