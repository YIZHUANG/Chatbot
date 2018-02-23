import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import RaisedButton from 'material-ui/RaisedButton';

const styles={
    whiteSpace: "normal",
    wordWrap: "break-word"
}

export default class ApiKeyTable extends Component {
  constructor(props){
    super(props);
    this.state={first:false,second:false,thrid:false}
  }

  renderFirstApiSet(){
    if(this.state.first){
      return <p>Your super secret api key is : 5cj3F0nQw4ngucb3XjmYCe</p>
    }
    return <RaisedButton label="generate api key" onClick={()=>this.setState({first:true})} />
  }

  renderSecondApiSet(){
    if(this.state.second){
      return <p>Your super secret api key is : dfgdgfdggQw4nghfXjmYCe</p>
    }
    return <RaisedButton label="generate api key" onClick={()=>this.setState({second:true})} />
  }

  renderThirdApiSet(){
    if(this.state.third){
      return <p>Your super secret api key is : d2132133213fXjmYCe</p>
    }
    return <RaisedButton label="generate api key" onClick={()=>this.setState({third:true})} />
  }

  render() {
    return (
      <Table className="api_table" style={{ width: "70%" }}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Api_end_point</TableHeaderColumn>
            <TableHeaderColumn>API key</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn
              className="api_col"
              style={styles}
            >
              https://api.mlab.com/api/1/databases/drug/collections/drug
            </TableRowColumn>
            <TableRowColumn style={styles}>{this.renderFirstApiSet()}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={styles}>https://api.mlab.com/api/1/databases/hospitals/collections/hospitals</TableRowColumn>
            <TableRowColumn style={styles}>{this.renderSecondApiSet()}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={styles}>https://api.mlab.com/api/1/databases/symptoms/collections/symptoms</TableRowColumn>
            <TableRowColumn style={styles}>{this.renderThirdApiSet()}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}
