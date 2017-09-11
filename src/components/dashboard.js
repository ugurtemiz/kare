import React, { Component } from 'react';
import Squares from './squares';

class Dashboard extends Component {

    render() {
      return (
        <div>
          <h1>Dashboard</h1>
          <Squares />
        </div>
      );
    }
  }
  
  export default Dashboard;