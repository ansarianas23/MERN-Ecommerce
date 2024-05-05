import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserProfile from '../features/user/components/UserProfile'

const UserProfilePage = () => {
  return (
    <div>
        <Navbar></Navbar>
        <h1 className='text-2xl mx-auto text-center my-6 font-semibold'>My Profile</h1>
        <div className='mt-6'>
            <UserProfile></UserProfile>
        </div>
    </div>
  )
}

export default UserProfilePage
