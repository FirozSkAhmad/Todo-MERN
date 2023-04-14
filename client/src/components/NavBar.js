import React from 'react'
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <div className="header">
                <h1>Welcome to Todo List</h1>
            </div>

            {!localStorage.getItem("token") ? <div className="nav-links">
                <Link to={"/login"} className="nav-link">
                    Login
                </Link>
                <Link to={"/register"} className="nav-link">
                    Register
                </Link>
            </div> : null}
        </div>
    )
}

export default NavBar

