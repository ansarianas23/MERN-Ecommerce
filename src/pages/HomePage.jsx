import React from 'react'
import ProductList from '../features/product/component/ProductList'
import Navbar from "../features/navbar/Navbar"
import Footer from '../features/footer/Footer'

const HomePage = () => {
  return (
    <div>
        <Navbar></Navbar>
        <ProductList></ProductList>
        <Footer></Footer>
    </div>
  )
}

export default HomePage
