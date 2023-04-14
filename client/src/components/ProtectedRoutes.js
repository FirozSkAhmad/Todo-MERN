import { Navigate } from "react-router-dom";

const ProtectedRoutes = (props) => {

    const { Cmp } = props

    const auth = localStorage.getItem("token");

    return auth ? <Cmp /> : <Navigate to="/login" />;

}

export default ProtectedRoutes
