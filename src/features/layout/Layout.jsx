import React from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'

const Layout = () => {
  return (
    <>
        <div className='w-full'>
            <Navbar></Navbar>
        </div>
        
        <div className='w-full'>
            <Outlet/>
        </div>

        <div>
            <Footer/>
        </div>
    </>
  )
}

export default Layout
