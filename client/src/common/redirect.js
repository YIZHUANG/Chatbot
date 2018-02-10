import React, { Component } from "react";
import { Link } from "react-router-dom";

import LinearProgress from "material-ui/LinearProgress";

class Redirect extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 3 };
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.timer = setInterval(() => this.setTimer(), 1000);
    if (this.state.counter <= 0) {
      this.props.history.push("/DashBoard");
    }
  }
  componentWillUpdate() {
    if (this.state.counter <= 0) {
      this.props.history.push("/DashBoard");
    }
  }

  setTimer() {
    this.setState({
      counter: this.state.counter - 1
    });
  }

  render() {
    console.log(this.state.counter);
    return (
      <div>
        <span className="Logging">
        Logging in .......
      </span>
        <LinearProgress mode="indeterminate" />
      </div>
    );
  }
}

export default Redirect;
