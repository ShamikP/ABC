import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';



const firebaseConfig = {
    apiKey: "AIzaSyCMTG7jN4xeeOjWokC19ghn8-TPnPw6yGE",
    authDomain: "blog-43e2f.firebaseapp.com",
    projectId: "blog-43e2f",
    storageBucket: "blog-43e2f.appspot.com",
    messagingSenderId: "902443032171",
    appId: "1:902443032171:web:5057f82906a8379f2f9b2e",
    measurementId: "G-H3PWBB3WRT",
    databaseURL: 'https://blog-43e2f-default-rtdb.firebaseio.com/',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
const app = initializeApp(firebaseConfig);
const database = firebase.database();

export default database;