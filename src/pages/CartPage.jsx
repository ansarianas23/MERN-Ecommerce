import React from 'react'
import Cart from '../features/cart/Cart'
import Navbar from "../features/navbar/Navbar"

const CartPage = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div className='mt-5'>
        <Cart></Cart>
      </div>
        
    </div>
  )
}

export default CartPage
