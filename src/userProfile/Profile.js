import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import './Profile.css'

const Profile = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState(null);
  const [url, setUrl] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if(user) {
      const docRef = firebase.firestore().collection('users').doc(user.uid);
      docRef.get().then((doc) => {
        if (doc.exists) {
          setUsername(doc.data().username);
          setName(doc.data().name);
          setBio(doc.data().bio);
          setUrl(doc.data().photoURL);
        }
      });
    }
  }, []);

  const handleProfileUpdate = (event) => {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    if (user) {
      // Updating user data in Firestore
      firebase.firestore().collection('users').doc(user.uid).set({
        username: username,
        name: name,
        bio: bio,
        photoURL: url,
      });
    }
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child('profilePhotos/' + file.name);
    await fileRef.put(file);
    setUrl(await fileRef.getDownloadURL());
  };

  return (
    <div>
      <button className="toggle-btn" onClick={() => setShowForm(!showForm)}> EDIT</button> {/* This button will toggle the form */}
      {showForm && (  // The form will only be displayed if showForm is true
        <form className="profile-form" onSubmit={handleProfileUpdate}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
          <input type="file" onChange={handlePhotoUpload} />
          <button type="submit">Update Profile</button>
        </form>
      )}
      
    </div>
  );
};

export default Profile;
