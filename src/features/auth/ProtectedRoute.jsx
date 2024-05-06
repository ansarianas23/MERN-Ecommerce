import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectLoggedInUser } from './authSlice'
import { selectUserInfo } from '../user/UserSlice';

const ProtectedRoute = ({chidlren}) => {

    const user = useSelector(selectUserInfo);

    if(!user){
        return <Navigate to="/login" replace={true}></Navigate>
    }

    return chidlren;
}

export default ProtectedRoute;
