import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectLoggedInUser } from './authSlice'
import { selectUserInfo } from '../user/UserSlice';

const Protected = ({ chidlren }) => {

    const user = useSelector(selectLoggedInUser);

    if(!user){
        return <Navigate to="/login" replace={true}></Navigate>
    }

    return chidlren;
}

export default Protected;
