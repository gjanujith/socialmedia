import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './Header.css'; 
import myImage from '../trailer-img.png'
import socialMedia from '../social-media.png'

const Header = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');

  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        console.log("User logged out");
      }).catch((error) => {
        console.error("Logout Error", error);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        firebase.firestore().collection('users').doc(user.uid).onSnapshot((doc) => {
          if (doc.exists) {
            setUsername(doc.data().username);
          } else {
            console.error('No such document!');
          }
        });
      } else {
        setUser(null);
        setUsername('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="header">
      <div className="logo">
        <img src={socialMedia} alt="Logo" />
      </div>
      <div className="website-name">
        SharePost
      </div>
      <div className="login-option">
        {user ? (
          <div className="user-info">
            <p>Welcome, {username}</p> 
            <button className='button-4' onClick={handleLogout}>Logout</button> 
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
     
    </div>
  );
};

export default Header;
