// Import the functions you need from the SDKs you need 
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

import 'firebase/database';

// import { getAnalytics } from "firebase";
// import { getFirestore } from "firesbase/firestore";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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



// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app)
// export const db = getFirestore(app);
const firebaseApp = initializeApp(firebaseConfig);
const realtimeDb = getDatabase(firebaseApp);
const db = getFirestore(firebaseApp);
export { db, realtimeDb };

// export default db;




//code2
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyCMTG7jN4xeeOjWokC19ghn8-TPnPw6yGE",
//   authDomain: "blog-43e2f.firebaseapp.com",
//   projectId: "blog-43e2f",
//   storageBucket: "blog-43e2f.appspot.com",
//   messagingSenderId: "902443032171",
//   appId: "1:902443032171:web:5057f82906a8379f2f9b2e",
//   measurementId: "G-H3PWBB3WRT"
// };

// // Use this to initialize the firebase App
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// // Use these for db & auth
// const db = firebaseApp.firestore();
// const auth = firebase.auth();

// export { auth, db };