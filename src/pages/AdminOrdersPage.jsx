import React from 'react'
import Navbar from "../features/navbar/Navbar"
import Footer from '../features/footer/Footer'
import AdminOrders from '../features/admin/components/AdminOrders'

const AdminOrdersPage = () => {
  return (
    <div>
        <Navbar></Navbar>
        <AdminOrders></AdminOrders>
    </div>
  )
}

export default AdminOrdersPage
