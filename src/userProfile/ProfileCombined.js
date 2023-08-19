import React from 'react'
import Profile from './Profile'
import { Link } from 'react-router-dom'
import './Profile.css'

const ProfileCombined = () => {
  return (
    <div>
       <Profile/>
       <Link className='back' to="/">Back</Link>
    </div>
  )
}

export default ProfileCombined