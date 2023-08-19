import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import './ProfileDisplay.css';

const ProfileDisplay = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const docRef = firebase.firestore().collection('users').doc(user.uid);
      docRef.get().then((doc) => {
        if (doc.exists) {
          setUsername(doc.data().username);
          setName(doc.data().name);
          setBio(doc.data().bio);
          setPhotoURL(doc.data().photoURL);
        }
      });
    }
  }, []);

  return (
    <div className="profileDisplay">
      <img src={photoURL} alt="Profile" />
      <h3 className='profile-name'>@{username}</h3>
      <h4>{name}</h4>
      <p>{bio}</p>
    </div>
  );
};

export default ProfileDisplay;
