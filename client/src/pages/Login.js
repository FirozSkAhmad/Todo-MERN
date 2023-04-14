import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { isValid, isValidEmail } from '../validations/validations'

const Login = () => {

    const initialData = {
        email: "", password: ""
    }

    const [toggle, setToggel] = useState(true)
    const [formData, setFormData] = useState(initialData)
    const [errors, setErrors] = useState({})
    const [serverErrors, setServerErrors] = useState({})

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
                    url: "http://localhost:4000/loginUser",
                    method: "POST",
                    data: formData
                }

                const doc = await axios(options)
                console.log(doc)
                const token = doc.data.token
                const tokenData = jwt_decode(token)

                localStorage.setItem("token", token);
                localStorage.setItem("userId", tokenData.userId);
                localStorage.setItem("name", tokenData.name);

                navigate("/")
                setFormData(initialData)
            }
        }
        catch (err) {
            const errs = {}
            errs.message = err.response.data.msg
            setServerErrors(errs)
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={submitHandler}>
                <input
                    value={formData.email}
                    onChange={formHandler}
                    type="email"
                    placeholder="Email"
                />
                <br />
                <input
                    value={formData.password}
                    onChange={formHandler}
                    type="password"
                    placeholder="Password"
                />
                <br />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login

