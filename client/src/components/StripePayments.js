import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { handleStripeToken } from "../actions";

class StripePayments extends Component {
  onSubmit(token) {
    this.props.handleStripeToken(token);

    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep({ value: 12 });
    });
  }

  render() {
    console.log(process.env.REACT_APP_STRIPE_KEY);
    return (
      <StripeCheckout
        name="yi"
        description="$5 for 20 emails"
        amount={500}
        token={token => this.onSubmit(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Top up</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, { handleStripeToken })(StripePayments);
