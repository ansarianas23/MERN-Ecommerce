import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectLoggedInUser } from './authSlice'

const ProtectedRoute = ({chidlren}) => {

    const user = useSelector(selectLoggedInUser);

    if(!user){
        return <Navigate to="/login" replace={true}></Navigate>
    }

    return chidlren;
}

export default ProtectedRoute;
