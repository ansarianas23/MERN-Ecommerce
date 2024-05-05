import React from 'react'
import UserOrders from '../features/user/components/UserOrders'
import Navbar from '../features/navbar/Navbar'

const MyOrdersPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <h1 className='text-2xl mx-auto text-center my-6 font-semibold'>My Orders</h1>
      <div>
        <UserOrders></UserOrders>
      </div>
    </div>
    
  )
}

export default MyOrdersPage