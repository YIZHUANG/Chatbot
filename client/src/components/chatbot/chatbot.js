import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";

import Review from "./review";
import Message from "./message";

import StripePayments from "../StripePayments";

import Demo from "./index";

import Appointment from "./appointment";

class Chatbot extends Component {
  onConsole() {
    console.log("yep!!");
  }

  render() {
    console.log(this.props.data.username);
    let mess = `Hello ${this.props.data.username}, how are you today? `;

    return (
      <div>
        <ChatBot
          headerTitle="Super smartbot"
          floating
          steps={[
            {
              id: "1",
              message: mess,
              trigger: "2"
            },
            {
              id: "2",
              options: [
                {
                  value: 1,
                  label: "Good",
                  trigger: "4"
                },
                {
                  value: 2,
                  label: "Not good",
                  trigger: "4"
                },
                { value: 3, label: "Emergency", trigger: "4" }
              ]
            },
            {
              id: "4",
              message: "I am so sorry to hear that!",
              trigger: "5"
            },
            {
              id: "5",
              message: "How many i be of help?",
              trigger: "message"
            },
            {
              id: "message",
              user: true,
              trigger: "6",
              validator: value => {
                if (!value) return "Please try again!";
                else {
                  return true;
                }
              }
            },
            {
              id: "6",
              component: <Message />,
              replace: true,
              waitAction: true,
              asMessage: true,
              trigger: "6"
            },
            {
              id: "message",
              user: true,
              trigger: "6"
            },
            {
              id: "appointmentBefore",
              message: "Ok, just a moment please",
              trigger: "appointment"
            },
            {
              id: "appointment",
              message: "Please choose your prefer time and location",
              trigger: "chooseAppointment"
            },
            {
              id: "chooseAppointment",
              component: <Appointment />,
              replace: true,
              waitAction: true,
              asMessage: true,
              trigger: "bookSuccess"
            },
            {
              id: "bookSuccess",
              message: "You have booked an appointment, would you like to pay",
              trigger: "PayOrNot"
            },
            {
              id: "PayOrNot",
              options: [
                {
                  value: 1,
                  label: "Yes",
                  trigger: "YesPay"
                },
                {
                  value: 2,
                  label: "No",
                  trigger: "NotPay"
                }
              ]
            },
            {
              id: "YesPay",
              component: <StripePayments />,
              replace: true,
              waitAction: true,
              trigger: "paySuccess"
            },
            {
              id: "paySuccess",
              message:
                "Thank you for your payment, is there anything i can help you with?",
              trigger: "message"
            },
            {
              id: "NotPay",
              message:
                "Remember you can always pay when you visit the doctor in person, is there anything i can help you with?",
              trigger: "message"
            }
          ]}
        />
      </div>
    );
  }
}

export default Chatbot;
