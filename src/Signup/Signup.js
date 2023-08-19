import React, { useState } from 'react';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import "firebase/compat/storage"
import "firebase/compat/database"
import 'firebase/compat/firestore'
import 'firebase/firestore'
import "./Signup.css"
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (event) => {
    event.preventDefault();

    // Create a new user with email and password
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed up successfully
        const user = userCredential.user;
        
        // Update the user profile
        return user.updateProfile({
          displayName: username
        }).then(() => {
          // Store additional user data in Firestore (e.g., username)
          return firebase.firestore().collection('users').doc(user.uid).set({
            username: username,
            email: email,
          });
        });
      })
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        // Handle signup errors
        console.error('Signup Error:', error);
      });
  };

  return (
    <div className="signup-container">
      {/* ... (existing JSX code remains the same) */}
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
