import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import Login from './components/login'
import Kare from './components/kare'

class App extends Component {
  constructor () {
    super();
    this.state = {
      isLoggedIn : firebase.auth().currentUser != null ? true : false,
      speed: 10
    };

    firebase.auth().onAuthStateChanged(firebaseUser => {
      this.setState({
        isLoggedIn : firebaseUser ? true : false
      });  
    });
    
    
  }
  
  componentDidMount() {
    const rootRef = firebase.database().ref();
    const speedRef = rootRef.child('speed');
    speedRef.on('value', snap => {
      this.setState({
        speed : snap.val()
      });  
    });
    console.log(this.state);
    if (!this.state.isLoggedIn) {
      this.props.history.push('login');
    }
  }
  
  render() {
    return (
      <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Kare} />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
