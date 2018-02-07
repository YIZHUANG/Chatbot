import React, { Component } from "react";
import { Link } from "react-router-dom";

class Redirect extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 5 };
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.timer = setInterval(() => this.setTimer(), 1000);
    if (this.state.counter <= 0) {
      this.props.history.push("/");
    }
  }
  componentWillUpdate() {
    if (this.state.counter <= 0) {
      this.props.history.push("/");
    }
  }

  setTimer() {
    this.setState({
      counter: this.state.counter - 1
    });
  }

  render() {
    console.log(this.state.counter);
    return <div>Hello! You will be redirect in {this.state.counter} sec</div>;
  }
}

export default Redirect;
