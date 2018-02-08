import React, { Component } from 'react';
import axios from 'axios';

import ChatBot from 'react-simple-chatbot';

export default class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      other: ''
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { other} = steps;
    this.setState({ other});
  }

  componentDidMount(){

  }

  render() {
    const { other} = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{other.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
