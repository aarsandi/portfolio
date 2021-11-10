import React, { useState } from 'react'
import axios from '../../api/axios'
import GridLoader from "react-spinners/GridLoader";

export default function Hire() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [content, setContent] = useState('')
    const [isEmailError, setIsEmailError] = useState(false)
    const [isEmailLoading, setIsEmailLoading] = useState(false)
    const [isEmailSuccess, setIsEmailSuccess] = useState(false)
    const [message, setMessage] = useState('')

    function submitSendEmail(event) {
        event.preventDefault()
        setIsEmailLoading(true)
        axios({
            method: 'post',
            url: '/sendEmail',
            data: {
                name: name,
                email: email,
                content: content
            }
        })
            .then(res => {
                setIsEmailLoading(false)
                setIsEmailSuccess(true)
                setIsEmailError(false)
                setMessage('Success send Email')
            }).catch(err => {
                console.log(err.response.data.error)
                setIsEmailLoading(false)
                setIsEmailSuccess(false)
                setIsEmailError(true)
                if (err.response) {
                    setMessage(err.response.data.error)
                } else {
                    setMessage('unhandle error')
                }
            })
    }
    return (
        <>
            <div id="app-hire">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-md-offset-1 col-md-pull-1">
                            <h2 className="heading">Are you looking for a web developer?</h2>
                            <form onSubmit={submitSendEmail} className="mb-5">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" onChange={(event) => { setName(event.target.value) }} placeholder="Name"/>
                                            
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="email" className="form-control" onChange={(event) => { setEmail(event.target.value) }} placeholder="Email"/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <textarea name="" className="form-control" id="" cols="30" rows="7" onChange={(event) => { setContent(event.target.value) }} aria-describedby="messageHelp" placeholder="Message"/>
                                            { isEmailError && <small id="messageHelp" className="form-text text-muted">{message}</small>}
                                            { isEmailSuccess && <small id="messageHelp" className="form-text text-muted">{message}</small>}
                                        </div>
                                    </div>
                                    { isEmailLoading &&
                                        <div className="col-md-12">
                                            <GridLoader
                                                size={10}
                                                color={"black"}
                                                loading={isEmailLoading}
                                            />
                                        </div>
                                    }
                                    { !isEmailLoading &&
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="submit" value="Send Message" className="btn btn-primary"/>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}