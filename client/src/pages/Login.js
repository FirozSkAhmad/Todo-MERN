import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { isValid, isValidEmail } from '../validations/validations'
import NavBar from "../components/NavBar";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { toast } from 'react-hot-toast'

const Login = () => {

    const initialData = {
        email: "", password: ""
    }

    const [toggle, setToggel] = useState(true)
    const [formData, setFormData] = useState(initialData)
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    function formHandler(event) {

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

    async function submitHandler(event) {
        try {
            event.preventDefault()

            const { email, password } = formData

            const credentials = { email, password }

            const errs = {}

            if (!isValid(credentials.email)) {
                errs.email = `please fill the email column`
            } else {
                if (!isValidEmail(credentials.email)) {
                    errs.email = `invalid emailId`
                }
            }

            if (!isValid(credentials.password)) {
                errs.password = `please fill the password column`
            }

            setErrors(errs)

            if (Object.keys(errs).length === 0) {
                const options = {
                    url: `${process.env.REACT_APP_BASE_URL}/login`,
                    method: "POST",
                    data: formData
                }

                const doc = await axios(options)

                const token = doc.data.token

                const tokenData = jwt_decode(token)

                localStorage.setItem("token", token);
                localStorage.setItem("userId", tokenData.user_id);
                localStorage.setItem("name", tokenData.name);

                toast.success("Logged in successfully")

                navigate("/")

                setFormData(initialData)
            }
        }
        catch (err) {
            toast.error(err.response.data.message)
        }
    }

    return (
        <>
            <NavBar />
            <div className="login-container">
                <form onSubmit={submitHandler}>

                    <div className="inputField">
                        <input
                            name="email"
                            value={formData.email}
                            onChange={formHandler}
                            type="email"
                            placeholder="Email"
                        />
                        <div className="errBlock">
                            {(errors.email) ? <p> {errors.email}</p> : null}
                        </div>
                    </div>

                    <div className="inputField">
                        <div id="passwordField">
                            <input
                                name="password"
                                value={formData.password}
                                onChange={formHandler}
                                type={toggle ? "password" : "text"}
                                placeholder="Password"
                            />
                            <div id='icon' onClick={() => setToggel(!toggle)} >
                                {toggle ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </div>
                        </div>
                        <div className="errBlock">
                            {(errors.password) ? <p> {errors.password}</p> : null}
                        </div>
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>

                </form>
            </div>
        </>
    )
}

export default Login

