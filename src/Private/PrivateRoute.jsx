import { useContext } from "react";
import { AuthContext } from "../provider/Authprovider";
import { Navigate, useLocation } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {users, loading} = useContext(AuthContext)
    if(users){
        return children
    }
    if(loading){
        return <p>Loading.........</p>
    }
    return (
        <Navigate state={location.pathname} to = '/login'></Navigate>
    );
};

export default PrivateRoute;