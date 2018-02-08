import React, {Component} from 'react'
import {render} from 'react-dom'
import {Launcher} from 'react-chat-window'
import messageHistory from './messageHistory';
import TestArea from './TestArea';
import axios from "axios";

export default class Demo extends Component {

  constructor() {
    super();
    this.state = {
      messageList: messageHistory,
      newMessagesCount: 0,
      isOpen: false,
      context:{},
      response:""
    };
  }

  componentDidMount(){
    let mess={
"input": {
    "text": "what happen"
  },
      "context": {
        "conversation_id": "afdea98e-fb7b-4b19-b3b6-0808d8d70640",
        "system": {
            "dialog_stack": [
                {
                    "dialog_node": "root"
                }
            ],
            "dialog_turn_counter": 1,
            "dialog_request_counter": 1,
            "_node_output_map": {
                "Start And Initialize Context": [
                    0,
                    0
                ]
            },
            "branch_exited": true,
            "branch_exited_reason": "completed"
        }
      }
}
    axios.post("/api/message",mess)
    .then(res=>{this.setState({response:res.data.output.text,context:res.data.context})})
    .catch(()=>console.log("no no no "))
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
  }

  _sendMessage(text) {


    let mess={"input":
    {"text":text},
    "context":{
        "conversation_id": "afdea98e-fb7b-4b19-b3b6-0808d8d70640",
        "system": {
            "dialog_stack": [
                {
                    "dialog_node": "root"
                }
            ],
            "dialog_turn_counter": 1,
            "dialog_request_counter": 1,
            "_node_output_map": {
                "Start And Initialize Context": [
                    0,
                    0
                ]
            },
            "branch_exited": true,
            "branch_exited_reason": "completed"
        }
      }
  }
  let theText="this is shit"
  axios.post("/api/message",mess)
  .then(res=>{this.setState({response:res.data.output.text,context:res.data.context
  ,messageList:[...this.state.messageList, {
    author: 'them',
    type: 'text',
    data:{text}
  }]})})
  .catch(()=>console.log("no no no "))
}
  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0
    })
  }

  render() {
    console.log(this.state.response)
    return <div>
      <TestArea
        onMessage={this._sendMessage.bind(this)}
      />
      <Launcher
        agentProfile={{
          teamName: 'react-live-chat',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        newMessagesCount={this.state.newMessagesCount}
        handleClick={this._handleClick.bind(this)}
        isOpen={this.state.isOpen}
        showEmoji
      />
    </div>
  }
}
