import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

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
firebase.initializeApp(firebaseConfig);


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    // Authenticate user with Firebase Authentication
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // Redirect to desired component upon successful login
        navigate("/Display");
      })
      .catch((error) => {
        // Handle login error
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
