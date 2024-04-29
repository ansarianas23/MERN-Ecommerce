import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDetails from '../features/product/component/ProductsDetails'
import Footer from '../features/footer/Footer'


const ProductDetailsPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <ProductDetails></ProductDetails>
      <Footer></Footer>
      
    </div>
  )
}

export default ProductDetailsPage