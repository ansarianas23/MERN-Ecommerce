import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser, signOutUserAsync } from '../authSlice';
import { Navigate } from 'react-router-dom';

const LogOut = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    
    useEffect(()=>{
        dispatch(signOutUserAsync());
    },[]);

  return (
    <>
        {user==null && <Navigate to='/' replace={true}></Navigate>}
    </>
  )
}

export default LogOut
