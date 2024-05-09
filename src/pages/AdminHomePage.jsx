import React from 'react'
import Navbar from "../features/navbar/Navbar"
import Footer from '../features/footer/Footer'
import AdminProductList from '../features/admin/components/AdminProductList'

const AdminHomePage = () => {
  return (
    <div>
        <Navbar></Navbar>
        <AdminProductList></AdminProductList>
        <Footer></Footer>
    </div>
  )
}

export default AdminHomePage
