import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import UserCard from './UserCard'

const Profile = () => {
  const userData=useSelector(store=>store.user)
  return (
    userData&&<div className=''>
      <EditProfile user={userData}/>
      
    </div>
  )
}

export default Profile