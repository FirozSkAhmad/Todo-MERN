import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {

    const { Cmp } = props

    const auth = localStorage.getItem("token");

    return auth ? <Cmp /> : <Navigate to="/login" />;

}

const ProtectedRouteIn = (props) => {

    const { Cmp } = props

    const auth = localStorage.getItem("token");

    return auth ? <Navigate to="/" /> : <Cmp />;

}

export { ProtectedRoute, ProtectedRouteIn } 
