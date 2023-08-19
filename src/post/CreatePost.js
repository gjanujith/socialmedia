import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import './CreatePost.css'; 

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const uploadTask = firebase.storage().ref(`images/${image.name}`).put(image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          firebase
            .storage()
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              firebase.firestore().collection('posts').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: firebase.auth().currentUser.displayName,
                userId: firebase.auth().currentUser.uid,
              });

              setProgress(0);
              setCaption('');
              setImage(null);
              setShowForm(false);
            });
        }
      );
    } else {
      alert('Please select an image to upload.');
    }
  };

  return (
    <div className="createpost-container">
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Add Post' : 'Add Post'}
      </button>

      {showForm && (
        <>
          <progress value={progress} max="100" />
          <input type="text" placeholder="Enter a caption..." onChange={event => setCaption(event.target.value)} value={caption} />
          <input type="file" onChange={handleImageChange} />
          <button onClick={handleUpload}>Upload</button>
        </>
      )}
      <br/>
      <h2 className='feed'>#feed:</h2>
    </div>
  );
};

export default CreatePost;
