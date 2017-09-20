import React, { Component } from 'react';
import { retrieveSquares, dailyExport, resetQuantities, addSquare } from '../helpers/data'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Settings extends Component {
  constructor (props) {
    super(props);

    this.state = {
        squares : [],
        report : []
    } 
  }
  
  componentDidMount () {
    retrieveSquares( (squares) => {
        this.setState({ squares });
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    addSquare(this.name.getValue());
  }
  
  handleDailyReport = (e) => {
    e.preventDefault()
    console.log(this.state.squares)
    dailyExport(this.state.squares, () => {
      this.setState({ report : JSON.parse(JSON.stringify(this.state.squares)) });
      resetQuantities(this.state.squares, () => {
        console.log('everything done. show the graph');
      })
    });
  }

  renderReport() {
    var result = [];
    var array = this.state.report;
    for (var key in array) {
      if (array.hasOwnProperty(key)) {
            result.push(
                <li key={key}> {array[key].name} --> Quantity: {array[key].quantity}</li> 
            );
        }
    }  
    return result;
  }

  renderSquares() {
    var result = [];
    var array = this.state.squares;
    for (var key in array) {
      if (array.hasOwnProperty(key)) {
            result.push(
              <TableRow key={key}>
                <TableRowColumn>{array[key].name}</TableRowColumn>
                <TableRowColumn>{array[key].quantity}</TableRowColumn>
              </TableRow>
            );
        }
    }  
    return result;
  }

  render() {
    return (
      <div>
          <h1>Settings</h1>
          <button onClick={this.handleDailyReport} className="btn btn-primary">Get Daily Report</button>
          <h2>Daily Report</h2>
          <ul>
            {this.renderReport()}
          </ul>
          <form onSubmit={this.handleSubmit}>
              <TextField
                hintText="Cappuccino"
                floatingLabelText="Product Name"
                ref={(name) => this.name = name}
              />
              <RaisedButton type="submit" label="Primary" primary={true} style={{margin: 12}} />
          </form>
          <Table>
            <TableHeader 
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn colSpan="3" tooltip="Product List" style={{textAlign: 'center'}}>
                  Product List
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="Name" style={{width:'50%'}} >Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Quantity" style={{width:'50%'}}>Quantity</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              deselectOnClickaway={false}
              showRowHover={true}
              stripedRows={false}
            >
              {this.renderSquares()}
            </TableBody>
          </Table>
      </div>
    );
  }
}
  
export default Settings;