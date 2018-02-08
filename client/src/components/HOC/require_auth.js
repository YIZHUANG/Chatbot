import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentDidMount() {
      this.props.fetchUser();
    }

    render() {
      console.log(this.props.user);
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    const { authenticated, user } = state.auth;
    return { authenticated, user };
  }

  return connect(mapStateToProps, { fetchUser })(Authentication);
}
