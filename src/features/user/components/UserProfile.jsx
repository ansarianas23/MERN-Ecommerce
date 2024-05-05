import React from 'react'
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../auth/authSlice';

const UserProfile = () => {
  const user = useSelector(selectLoggedInUser);
  const userObj = user[0];

  const handleEdit = ()=>{
    
  }

  const handleRemove = ()=>{

  }

  return (
    <div className="mx-auto bg-white max-w-7xl px-4 sm:px-0 lg:px-0">
      <div className="px-4 py-3 sm:px-6 space-y-3">
        <h1 className="text-xl font-bold tracking-tight">
          Name : {userObj.name ? userObj.name: 'New User'}
        </h1>
        <h3 className="text-xl font-bold tracking-tight text-red-900">
          Email Address : {userObj.email}
        </h3>
      </div>
              
      {/* lower details section */}
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <p className="mt-0.5 text-sm text-gray-500">Your Addresses :</p>
        {userObj?.addresses?.map((address)=>(
          <div className="flex justify-between gap-x-6 p-4 mt-3 border-[1px] rounded-md">
          <div className="flex gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                Name: <span className='font-normal'>{address.name}</span>
              </p>
              <p className="text-sm font-semibold leading-6 text-gray-900">
                Address: <span className='font-normal'>{address.street}</span>
              </p>
              <p className="text-sm font-semibold leading-6 text-gray-900">
                Pin Code: <span className='font-normal'>{address.pinCode}</span>
              </p>
            </div>
          </div>

          <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                Phone: <span className='font-normal'>{address.phone}</span>
              </p>
              <p className="text-sm font-semibold leading-6 text-gray-900">
                City: <span className='font-normal'>{address.city}</span>
              </p>
          </div>

          {/* buttons */}
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <button onClick={(e)=>handleEdit(e)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
              Edit
            </button>
            <button onClick={(e)=>handleRemove(e)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
              Remove
            </button>
          </div>
        </div>
        ))}
        
      </div>
  </div>
  )
}

export default UserProfile
