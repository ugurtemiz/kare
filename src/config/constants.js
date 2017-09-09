import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDJezmixl_fjV6fAn1DZBF9qaubLOTx1bE",
  authDomain: "kare-kahve.firebaseapp.com",
  databaseURL: "https://kare-kahve.firebaseio.com",
  projectId: "kare-kahve",
  storageBucket: "kare-kahve.appspot.com",
  messagingSenderId: "573800918060"
  };

firebase.initializeApp(config)

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth();