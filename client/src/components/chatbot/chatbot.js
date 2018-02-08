import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";

import Review from "./review";

import StripePayments from "../StripePayments";

import Demo from "./index";

class Chatbot extends Component {
  onConsole() {
    console.log("yep!!");
  }
  render() {
    console.log(this.props.data.username);
    let mess = `Hello ${this.props.data.username}, how are you today? `;

    return (
      <div>
<iframe
    width="350"
    height="430"
    src="https://console.dialogflow.com/api-client/demo/embedded/376ec32a-61b0-49fd-8e84-b61f66e71943">
</iframe>
        <ChatBot
          steps={[
            {
              id: "1",
              message: mess,
              trigger: "2"
            },
            {
              id: "2",
              options: [
                { value: 1, label: "Good", trigger: ()=>console.log("damn it") },
                {
                  value: 2,
                  label: "Not good",
                  trigger: "4"
                },
                { value: 3, label: "Emergency", trigger: "4" }
              ]
            },
            {
              id: "3",
              message: "It's good to know!",
              trigger: "5"
            },
            {
              id: "4",
              message: "I am so sorry to hear that!",
              trigger: "5"
            },
            {
              id: "5",
              message: "How many i be of help?",
              trigger: "6"
            },
            {
              id: "6",
              options: [
                {
                  value: 1,
                  label:
                    "Book an appointment at the nearest health care center",
                  trigger: "10"
                },
                {
                  value: 2,
                  label: "Talk to a doctor directly",
                  trigger: "9"
                },
                {
                  value: 3,
                  label: "Leave a message to the doctor",
                  trigger: "15"
                },
                { value: 4, label: "Others", trigger: "7" }
              ]
            },
            {
              id: "7",
              message: "Could you be more specific ?",
              trigger: "other"
            },
            {
              id: "other",
              user: true,
              trigger: "8"
            },
            {
              id: "8",
              component: <Review />,
              asMessage: true,
              end: true
            },
            {
              id: "9",
              component: <Demo />,
              waitAction: true
            },
            {
              id: "10",
              message:
                "Great, i have book you an appointment at HelsinkiKatu 12B at tomorrow 2pm, the appointment fee is 5 euro, would you like to pay now?",
              trigger: "11"
            },
            {
              id: "11",
              options: [
                { value: 1, label: "Yes", trigger: "13" },
                {
                  value: 2,
                  label: "Not good",
                  trigger: "4"
                },
                { value: 3, label: "No thx", trigger: "14" }
              ]
            },
            {
              id: "13",
              component: <StripePayments />,
              waitAction: true,
              trigger: "12"
            },
            {
              id: "12",
              message:
                "Thank you for your payment, remember to come to your appointment at ....!",
              end: true
            },
            {
              id: "14",
              message: "Ok, be sure to be there on time!",
              end: true
            },
            {
              id: "15",
              user:true,
              end: true
            }
          ]}
        />
      </div>
    );
  }
}

export default Chatbot;
