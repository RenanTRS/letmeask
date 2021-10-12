import firebase from "firebase/app";

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBM72YDPdV0Mdn_SOQUC0rZepAIjHugFmc",
    authDomain: "letmeask-6bc71.firebaseapp.com",
    databaseURL: "https://letmeask-6bc71-default-rtdb.firebaseio.com",
    projectId: "letmeask-6bc71",
    storageBucket: "letmeask-6bc71.appspot.com",
    messagingSenderId: "723020375855",
    appId: "1:723020375855:web:d3c5131b13561c40e6e3da"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();