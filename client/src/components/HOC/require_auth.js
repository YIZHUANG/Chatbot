import React, {Component} from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class Authentication extends Component {
    render(){
      return <ComposedComponent {...props} />
    }
  }

  function mapStateToProps(state) {
    return {authenticated: state.authenticated}
  }

  return connect(mapStateToProps)(Authentication);
}
