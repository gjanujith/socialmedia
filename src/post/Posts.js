import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { formatDistanceToNow } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.css';
import './Poster.css'

const Posts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let unsubscribe;

    if (userId) {
      // If userId is provided, fetch posts only from that user
      unsubscribe = firebase.firestore().collection('posts')
        .where('userId', '==', userId)
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
        });
    } else {
      // If no userId is provided, fetch all posts
      unsubscribe = firebase.firestore().collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
        });
    }

    return () => unsubscribe();
  }, [userId]);

  return (
    <div className="container">
      
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-100">
              <img src={post.data.imageUrl} alt="Uploaded content" className="card-img-top" />
              <div className="card-body">
                <p className="card-text"><b>@{post.data.username}</b></p>
                <p className="card-text">{post.data.caption}</p>
                <p className="card-text-name">{post.data.timestamp ? formatDistanceToNow(post.data.timestamp?.toDate()) + ' ago' : '...'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
