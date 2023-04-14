import React from 'react'
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <div className="header">
                <h1>Welcome to Todo</h1>
            </div>
            <div className="nav-links">
                <Link to={"/"} className="nav-link">
                    Home
                </Link>
                <Link to={"/login"} className="nav-link">
                    Login
                </Link>
                <Link to={"/register"} className="nav-link">
                    Register
                </Link>
            </div>
        </div>
    )
}

export default NavBar

