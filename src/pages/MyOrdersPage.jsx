import React from 'react'
import UserOrders from '../features/user/components/UserOrders'
import Navbar from '../features/navbar/Navbar'

const MyOrdersPage = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div>
        <UserOrders></UserOrders>
      </div>
    </div>
    
  )
}

export default MyOrdersPage