import React, { Component } from 'react';
import { retrieveSquares, dailyExport, resetQuantities, addSquare } from '../helpers/data'

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
    addSquare(this.name.value);
  }
  
  handleDailyReport = (e) => {
    e.preventDefault()
    console.log(this.state.squares)
    dailyExport(this.state.squares, () => {
      this.setState({ report : Object.assign({}, this.state.squares) });
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
                <li key={key}> {array[key].name} --> Quantity: {array[key].quantity}</li> 
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
            <div className="form-group">
              <label>Name</label>
              <input className="form-control" ref={(name) => this.name = name} placeholder="Name"/>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
          </form>
          <ul>
            {this.renderSquares()}
          </ul>
      </div>
    );
  }
}
  
export default Settings;