import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isValid, isValidEmail } from '../validations/validations'
import NavBar from "../components/NavBar";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { toast } from 'react-hot-toast'


const Register = () => {

    const [formData, setFormData] = useState({
        name: "", email: "", password: ""
    })

    const [toggle, setToggel] = useState(true)
    const [errors, setErrors] = useState({})
    const [serverErrors, setServerErrors] = useState({})

    const navigate = useNavigate();

    function fromHandler(event) {

        const { name, value, type, checked } = event.target

        setFormData((preState) => {
            return {
                ...preState,
                [name]: type === "checkbox" ? checked : value
            }
        })

        setErrors(((preState) => {
            return {
                ...preState,
                [name]: ""
            }
        }))
    }

    const registerUser = async (e) => {
        try {
            e.preventDefault();

            const { name, email, password } = formData

            const errs = {}

            if (!isValid(name)) {
                errs.name = `please fill the Name column`
            }

            if (!isValid(email)) {
                errs.email = `please fill the email column`
            } else {
                if (!isValidEmail(email)) {
                    errs.email = `invalid emailId`
                }
            }

            if (!isValid(password)) {
                errs.password = `please fill the password column`
            }

            setErrors(errs)

            if (Object.keys(errs).length === 0) {
                const options = {
                    url: "http://localhost:4000/register",
                    method: "POST",
                    data: formData
                }
                
                await axios(options)

                toast.success("registered sucessfully")

                navigate("/login")
            }
        }
        catch (err) {
            const errs = {}
            errs.message = err.response.data.message
            setServerErrors(errs)
        }
    };

    return (<>
        <NavBar />
        <div className="container">

            <form className="register-form" onSubmit={registerUser}>

                <div className="inputField">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={fromHandler}
                        className="input-field"
                    />
                    <div className="errBlock">
                        {(errors.name) ? <p> {errors.name}</p> : null}
                    </div>
                </div>


                <div className="inputField">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={fromHandler}
                        className="input-field"
                    />
                    <div className="errBlock">

                        {(errors.email) ? <p> {errors.email}</p> : null}
                    </div>
                </div>

                <div className="inputField" >
                    <div id="passwordField">
                        <input
                            type={toggle ? "password" : "text"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={fromHandler}
                            className="input-field"
                        />
                        <div id='icon' onClick={() => setToggel(!toggle)} >
                            {toggle ? <AiFillEye /> : <AiFillEyeInvisible />}
                        </div>
                    </div>
                    <div className="errBlock">
                        {(errors.password) ? <p> {errors.password}</p> : null}
                    </div>
                </div>

                <div className="serverErrBlock">
                    {(serverErrors.message) ? <p> {serverErrors.message}</p> : ""}
                </div>

                <button type="submit" className="reg-btn">
                    Register
                </button>

            </form>
        </div>
    </>
    )
}

export default Register
