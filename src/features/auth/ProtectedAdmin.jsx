import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectLoggedInUser } from './authSlice'
import { selectUserInfo } from '../user/UserSlice';

const ProtectedAdmin = ({chidlren}) => {

    const user = useSelector(selectLoggedInUser);

    if(!user){
        return <Navigate to="/login" replace={true}></Navigate>
    }
    if(user && user[0]?.role !== 'admin'){
        return <Navigate to="/" replace={true}></Navigate>
    }

    return chidlren;
}

export default ProtectedAdmin;
