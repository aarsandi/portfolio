import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom";
import axios from '../../../api/axios'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const history = useHistory();

    function submitlogin(event) {
        event.preventDefault()
        axios({
            method: 'post',
            url: '/admin/login',
            data: {
                email: email,
                password: password
            }
        })
            .then(res => {
                setIsError(false)
                localStorage.setItem('access_token', res.data.token)
                history.push("/admin")
            }).catch(err => {
                setIsError(true)
                if (err.response) {
                    setErrMessage(err.response.data.error)
                } else {
                    setErrMessage('unhandle error')
                }
            })
    }

    return (
        <form onSubmit={submitlogin} className="mb-5">
            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" onChange={(event) => { setEmail(event.target.value) }} aria-describedby="emailHelp"/>
                { isError && <small id="emailHelp" className="form-text text-muted">{errMessage}</small>}
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" onChange={(event) => { setPassword(event.target.value) }}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link className="nav-link" to="/"> Home</Link>
        </form>
    )
}