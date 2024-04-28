import React from 'react'
import ProductList from '../features/product-list/component/ProductList'
import Navbar from "../features/navbar/Navbar"

const HomePage = () => {
  return (
    <div>
        <Navbar></Navbar>
        <ProductList></ProductList>
    </div>
  )
}

export default HomePage
