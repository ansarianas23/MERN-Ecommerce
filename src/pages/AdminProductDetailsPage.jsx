import React from 'react'
import Navbar from '../features/navbar/Navbar'
import Footer from '../features/footer/Footer'
import AdminProductDetails from '../features/admin/components/AdminProductsDetails'


const AdminProductDetailsPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <AdminProductDetails></AdminProductDetails>
      <Footer></Footer>
      
    </div>
  )
}

export default AdminProductDetailsPage