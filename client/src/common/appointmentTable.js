import React from 'react';
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

const AppintmentTable=()=>{
  return (
    <Table className="api_table" style={{ width: "70%" }}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>time</TableHeaderColumn>
          <TableHeaderColumn>hospital</TableHeaderColumn>
          <TableHeaderColumn>location</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        <TableRow>
          <TableRowColumn
            className="api_col"
            style={styles}
          >
            2017/05/21
          </TableRowColumn>
          <TableRowColumn style={styles}>Bulevardi 22, 00120 Helsinki</TableRowColumn>
          <TableRowColumn style={styles}>Helsinki Hospital</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn style={styles}>2018/05/21</TableRowColumn>
          <TableRowColumn style={styles}>Rakennus 12, Haartmaninkatu 4, 00290 Helsinki</TableRowColumn>
          <TableRowColumn style={styles}>Haartman hospital</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn style={styles}>2019/05/21</TableRowColumn>
          <TableRowColumn style={styles}>Topeliuksenkatu 5, 00260 Helsinki</TableRowColumn>
          <TableRowColumn style={styles}>HUS</TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default AppintmentTable;
