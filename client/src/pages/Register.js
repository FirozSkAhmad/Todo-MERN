import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// axios.defaults.baseURL = "http://localhost:4000";
import { isValid, isValidEmail } from '../validations/validations'

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
                errs.fname = `please fill the First Name column`
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
            const doc = await axios(options)
            console.log(doc)

            navigate("/login")
        }
            // const response = await fetch("http://localhost:4000/register", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         name,
            //         email,
            //         password,
            //     }),
            // });

            // const data = await response.json();

            // if (data.status) {
            //     alert(data.message);
            //     Navigate("/login");
            // } else {
            //     alert(data.message);
            //     Navigate("/register");
            // }
        }
        catch (err) {
            const errs = {}
            errs.message = err.response.data.msg
            setServerErrors(errs)
        }
    };

    return (
        <div className="container">
            <form className="register-form" onSubmit={registerUser}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={fromHandler}
                    className="input-field"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={fromHandler}
                    className="input-field"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={fromHandler}
                    className="input-field"
                />
                <button type="submit" className="submit-btn">
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register
