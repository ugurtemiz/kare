import React, { Component } from 'react';
import { retrieveSquares, updateQuantity } from '../helpers/data'

class Settings extends Component {
  constructor (props) {
    super(props);

    this.state = {
        squares : []
    } 
  }
  
  componentDidMount () {
    retrieveSquares( (squares) => {
        this.setState({ squares });
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    updateQuantity(null, this.name.value, -1, null);
  }

  renderSquares() {
    var result = [];
    var array = this.state.squares;
    for (var key in array) {
      console.log(array[key]);  
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