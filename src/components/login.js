import React, { Component } from 'react';
import * as firebase from 'firebase';

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.loginClick = this.loginClick.bind(this);

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                console.log(firebaseUser);
            } else {
                console.log('not logged in');
            }
        });

    }

    loginClick() {
        console.log(this.emailInput.value);
        console.log(this.passwordInput.value);
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(this.emailInput.value, this.passwordInput.value);
        promise
            //.then( user => console.log(user) )
            .catch( e => console.log(e.message) );

    }
  
    render() {
      return (
        <div>
            <input id="email" type="email" placeholder="Email" 
                ref={(input) => { this.emailInput = input; }} />
            <input id="password" type="password" placeholder="Password"
                ref={(input) => { this.passwordInput = input; }} />
            <button id="login" onClick={this.loginClick}>Login</button>
        </div>
      );
    }
  }
  
  export default Login;