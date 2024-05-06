import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../UserSlice';
import { useForm } from 'react-hook-form';

const UserProfile = () => {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, formState: { errors }, reset, setValue} = useForm();
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const handleEdit = (adressUpdate, index)=>{
    let newUser = {...user, addresses:[...user.addresses]} // for shallow copy issues
    newUser.addresses.splice(index, 1, adressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  }

  const handleRemove = (e, index)=>{
  }

  const handleAddress = ()=>{

  }

  const handleEditForm = (index)=>{
    console.log('index is', index);
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue('name', address.name);
    setValue('email', address.email);
    setValue('phone', address.phone);
    setValue('city', address.city);
    setValue('street', address.street);
    setValue('state', address.state);
    setValue('pinCode', address.pinCode);
  }

  const handleAdd = (address)=>{
    let newUser = {...user, addresses:[...user.addresses, address]} // for shallow copy issues
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  }

  return (
    <div className="mx-auto bg-white max-w-7xl px-4 sm:px-0 lg:px-0">
      <div className="px-4 py-3 sm:px-6 space-y-3">
        <h1 className="text-xl font-bold tracking-tight">
          Name : {user?.name ? user?.name: 'New User'}
        </h1>
        <h3 className="text-xl font-bold tracking-tight text-red-900">
          Email Address : {user?.email}
        </h3>
      </div>
              
      {/* lower details section */}
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

        <div className='flex justify-between items-center'>
          <p className="text-gray-700">Your Addresses :</p>
          <button onClick={(e)=>{setShowAddAddressForm(true); setSelectedEditIndex(-1)}} type="button" className="bg-green-700 px-5 py-2 rounded-md text-white font-medium hover:bg-green-600">Add New Address</button>
        </div>

        {/* Add Address form starts here */}
        <div className="lg:col-span-3 p-3 rounded-lg bg-white">
            {showAddAddressForm ? <form  noValidate onSubmit={handleSubmit((data)=>{
                handleAdd(data);
                reset();
              })}>
                <div>
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Addressal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register('name', {required: "name is requied"})}
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register('email', {required: "email is requied"})}
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                          Phone
                        </label>
                        <div className="mt-2">
                        <input
                            id="phone"
                            {...register('phone', {required: "phone is requied"})}
                            type="tel"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register('street', {required: "street is requied"})}
                            id="street"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register('city', {required: "city is requied"})}
                            id="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register('state', {required: "state is requied"})}
                            id="state"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register('pinCode', {required: "pinCode is requied"})}
                            id="pinCode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button onClick={()=>setSelectedEditIndex(-1)} type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                      <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Address</button>
                    </div>

                  </div>
                </div>

              </form> : null}
            </div>
            {/* Add Address form ends here */}


        {user?.addresses?.map((address, index)=>(
          <div key={index}>
            {/* Edit Address form start here */}
            <div className="lg:col-span-3 p-3 rounded-lg bg-white">
            {selectedEditIndex === index ? <form  noValidate onSubmit={handleSubmit((data)=>{
                handleEdit(data, index);
                reset();
              })}>
                <div>
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Addressal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register('name', {required: "name is requied"})}
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register('email', {required: "email is requied"})}
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                          Phone
                        </label>
                        <div className="mt-2">
                        <input
                            id="phone"
                            {...register('phone', {required: "phone is requied"})}
                            type="tel"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register('street', {required: "street is requied"})}
                            id="street"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register('city', {required: "city is requied"})}
                            id="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register('state', {required: "state is requied"})}
                            id="state"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register('pinCode', {required: "pinCode is requied"})}
                            id="pinCode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button onClick={()=>setSelectedEditIndex(-1)} type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                      <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit Address</button>
                    </div>

                  </div>
                </div>

              </form> : null}
            </div>
            {/* edit Address form ends here */}

            <div className="flex justify-between gap-x-6 p-4 mt-6 border-[1px] rounded-md">
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
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    Phone: <span className='font-normal'>{address.phone}</span>
                  </p>
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    City: <span className='font-normal'>{address.city}</span>
                  </p>
                </div>
              </div>

            {/* buttons */}
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <button onClick={()=>handleEditForm(index)} type="button" className="font-medium text-blue-800 hover:text-blue-500">Edit</button>
              <button onClick={(e)=>handleRemove(e, index)} type="button" className="font-medium text-red-600 hover:text-red-500">Remove</button>
            </div>

          </div>
        </div>
        ))}


        
      </div>
  </div>
  )
}

export default UserProfile
