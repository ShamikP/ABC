import React, { useState } from 'react';
import { getDatabase, ref, push, query, orderByChild, equalTo } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !username) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Perform email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format.');
      return;
    }

    // Check if the username is already taken
    const db = getDatabase();
    const usernameQuery = query(ref(db, 'users'), orderByChild('username'), equalTo(username));
    const checkUsername = new Promise((resolve, reject) => {
      // Query the database to check if the username exists
      const usernameExists = false;
      // Add code here to perform the query and set `usernameExists` to `true` if the username exists
      // You can use `onChildAdded` or `onValue` event listener to check for existing usernames

      // Resolve the promise if the username doesn't exist, otherwise reject it
      if (!usernameExists) {
        resolve();
      } else {
        reject('Username is already taken.');
      }
    });

    checkUsername
      .then(() => {
        // Create a user using Firebase Authentication
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // User creation successful, retrieve the user's unique ID
            const userId = userCredential.user.uid;

            // Save the user data to the Firebase Realtime Database
            const userData = {
              email: email,
              username: username,
              userId: userId,
            };
            const sanitizedUserId = userId.replace(/[.#$[\]/]/g, ''); // Sanitize the userId

            push(ref(db, 'users/' + sanitizedUserId), userData)
              .then(() => {
                // User data saved successfully
                setErrorMessage('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setUsername('');
                alert('Signup successful!');
              })
              .catch((error) => {
                // Error saving user data
                setErrorMessage(error.message);
              });
          })
          .catch((error) => {
            // User creation failed, display error message
            setErrorMessage(error.message);
          });
      })
      .catch((error) => {
        // Username is already taken, display error message
        setErrorMessage(error);
      });
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
