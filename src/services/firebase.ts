import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getDatabase } from "firebase/database";
//import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATA_BASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); //Autenticação

//export const provider = new GoogleAuthProvider();

//export const database = getDatabase(app); //Banco

//export {firebase, auth, database};

