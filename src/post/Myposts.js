import React, { useState, useEffect } from 'react'
import Posts from './Posts';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Link } from 'react-router-dom'
const Myposts = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
       <Link className='back' to="/">Back</Link>
      {userId && (
        <>
          <h2 className='myfeed'>#my posts:</h2>

          <Posts userId={userId}/>
        </>
      )}
    </div>
  )
} 
export default Myposts;