import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { handleStripeToken } from "../actions";
import RaisedButton from "material-ui/RaisedButton";

class StripePayments extends Component {
  onSubmit(token) {
    this.props.handleStripeToken(token);
    this.props.triggerNextStep();
  }

  render() {
    return (
      <StripeCheckout
        name="yi"
        description="Give me all your money"
        amount={500}
        token={token => this.onSubmit(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <RaisedButton label="Pay now" primary={true} />
      </StripeCheckout>
    );
  }
}

export default connect(null, { handleStripeToken })(StripePayments);
