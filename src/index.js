import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import Login from './components/login'
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

import history from './history'

var config = {
  apiKey: "AIzaSyDJezmixl_fjV6fAn1DZBF9qaubLOTx1bE",
  authDomain: "kare-kahve.firebaseapp.com",
  databaseURL: "https://kare-kahve.firebaseio.com",
  projectId: "kare-kahve",
  storageBucket: "kare-kahve.appspot.com",
  messagingSenderId: "573800918060"
};
firebase.initializeApp(config);

ReactDOM.render((
    <App history={history}/>
  ), document.getElementById('root'));
  
registerServiceWorker();
