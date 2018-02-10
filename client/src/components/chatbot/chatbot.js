import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";

import Review from "./review";
import Message from "./message";

import StripePayments from "../StripePayments";

import DoctorBox from "./doctor";

import Appointment from "./appointment";

import Consult from "./consult";

import NormalTalk from "./normalTalk";

class Chatbot extends Component {
  onConsole() {
    console.log("yep!!");
  }

  constructor(props) {
    super(props);
    this.state = { doctor: false };
  }

  renderDoctor() {
    return (
      <iframe
        width="350"
        height="430"
        src="https://console.dialogflow.com/api-client/demo/embedded/2c5fa8f0-94ed-469e-bcf8-c7a4f66180ec"
      />
    );
  }

  closeChatbox() {}

  render() {
    let mess = `Hello ${this.props.data.username}, how are you today? `;

    return (
      <div>
        {this.state.doctor ? this.renderDoctor() : null}
        <ChatBot
          headerTitle="Super smartbot"
          floating
          recognitionEnable={true}
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
                  trigger: "feelinggood"
                },
                {
                  value: 2,
                  label: "Not good",
                  trigger: "feelingbad"
                }
              ]
            },
            {
              id: "feelinggood",
              message: `I am glad to know , is there anything i can help you with ${
                this.props.data.username
              } ? `,
              trigger: "options"
            },
            {
              id: "feelingbad",
              message: `I am so sorry to hear that ${
                this.props.data.username
              } , but have no fear, you're in the right place. How may i help?`,
              trigger: "options"
            },
            {
              id: "options",
              options: [
                {
                  value: 1,
                  label: "Book an appointment at the hospital",
                  trigger: "appointmentBefore"
                },
                {
                  value: 2,
                  label: "Talk to a doctor now",
                  trigger: "doctorBefore"
                },
                { value: 4, label: "consult", trigger: "beforeConsult" }
              ]
            },
            {
              id: "4",
              message: `I am so sorry to hear that ${
                this.props.data.username
              }!`,
              trigger: "5"
            },
            {
              id: "5",
              message: `How many i be of help ${this.props.data.username}?`,
              trigger: "message"
            },
            {
              id: "6",
              component: <Message />,
              replace: true,
              waitAction: true,
              asMessage: true,
              trigger: "message"
            },
            {
              id: "commonMessage",
              message: `Is there anything i can help you with ${
                this.props.data.username
              } ?`,
              trigger: "message"
            },
            {
              id: "appointmentBefore",
              message: `Sure ${this.props.data.username}, just a moment please`,
              trigger: "appointment"
            },
            {
              id: "appointment",
              message:
                "Please choose the time slot and location that suits you best",
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
              message:
                "You have booked an appointment, the appointment fee is 5 euro, would you like to pay now or pay when you visit the doctor ? ",
              trigger: "PayOrNot"
            },
            {
              id: "PayOrNot",
              options: [
                {
                  value: 4,
                  label: "Yes",
                  trigger: "YesPay"
                },
                {
                  value: 5,
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
              message: `Thank you for your payment ${
                this.props.data.username
              }, is there anything i can help you with?`,
              trigger: "message"
            },
            {
              id: "NotPay",
              message:
                "Remember you can always pay when you visit the doctor in person, is there anything i can help you with?",
              trigger: "message"
            },
            {
              id: "doctorBefore",
              message: `sure thing ${
                this.props.data.username
              }! Just a moment please`,
              trigger: "showDoctorButton"
            },
            {
              id: "showDoctorButton",
              message:
                "Click on the button below will open a chat with the doctor",
              trigger: "showDoctor"
            },
            {
              id: "showDoctor",
              component: (
                <DoctorBox
                  showModal={() => this.setState({ doctor: true })}
                  clostModal={() => this.setState({ doctor: false })}
                />
              ),
              replace: true,
              waitAction: true,
              asMessage: true,
              trigger: "closeChatbox"
            },
            {
              id: "closeChatbox",
              message: `Thank you ${
                this.props.data.username
              },is there anything else i can help you with ? `,
              trigger: "message"
            },
            {
              id: "message",
              user: true,
              trigger: ({ value, steps }) => {
                if (value == "1") {
                  return "appointmentBefore";
                }
                if (value == "2") {
                  return "doctorBefore";
                }
                if (value.toLowerCase() == "no") {
                  return "end";
                } else {
                  return "6";
                }
              }
              //trigger: "6"
            },
            {
              id: "end",
              message: `thank you ${
                this.props.data.username
              }, if you have any questions, you can always ask me later`,
              end: true
            },
            {
              id: "Consult",
              component: <Consult />,
              asMessage: true,
              trigger: "userInput"
            },
            {
              id: "userInput",
              user: true,
              trigger: ({ value, steps }) => {
                if (value == "1") {
                  return "appointmentBefore";
                }
                if (value == "2") {
                  return "doctorBefore";
                }
                if (value.toLowerCase() == "no") {
                  return "end";
                } else {
                  return "Consult";
                }
              }
              //trigger: "Consult"
            },
            {
              id: "normalInput",
              user: true,
              trigger: ({ value, steps }) => {
                if (value == "1") {
                  return "appointmentBefore";
                }
                if (value == "2") {
                  return "doctorBefore";
                }
                if (value.toLowerCase() == "no") {
                  return "end";
                } else {
                  return "normalTalk";
                }
              }
              //trigger:"normalTalk"
            },
            {
              id: "beforeConsult",
              message: `Hey ${
                this.props.data.username
              }, just ask me what you want to know`,
              trigger: "normalInput"
            },
            {
              id: "normalTalk",
              component: <NormalTalk />,
              asMessage: true,
              trigger: "normalInput"
            }
          ]}
        />
      </div>
    );
  }
}

export default Chatbot;
