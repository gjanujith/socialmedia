import React from 'react'
import CreatePost from '../post/CreatePost'
import Posts from '../post/Posts'
import { Link } from 'react-router-dom';
import './Home.css'
import ProfileDisplay from '../userProfile/ProfileDisplay';
const Home = () => {


  return (
    <div>
    <div className='bar'>
    <Link to="/myposts" className="myButton">My posts</Link>
     <Link to="/profile" className="myButton">Edit profile</Link>
     </div>
     <ProfileDisplay/>
     <CreatePost/>
     <Posts/>
     
    
    </div>
  )
}

export default Home;