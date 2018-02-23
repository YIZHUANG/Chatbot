import React,{Component}from 'react';

export default class ShowAppointment extends Component{
  componentDidMount(){
    this.props.showAppointment();
  }
  render(){
    return(
      <div>Here you go!</div>
    )
  }
}
