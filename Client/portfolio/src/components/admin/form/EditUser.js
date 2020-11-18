import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { editUser } from '../../../store/actions/admin'

export default function EditUser() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()

    const userLogin = useSelector((state) => state.adminReducer.userLogin)
    const isError = useSelector((state) => state.adminReducer.isError)

    
    const [name, setName] = useState(userLogin ? userLogin.name : '')
    const [email, setEmail] = useState(userLogin ? userLogin.email : '')
    const [password, setPassword] = useState(userLogin ? userLogin.password : '')
    const [avatar, setAvatar] = useState(userLogin ? userLogin.avatar : '')
    console.log(password)
    
    function editUserSubmit(event) {
        event.preventDefault()
        dispatch(editUser(id, { name, email, password, avatar }))
        history.push('/admin')
    }

    useEffect(() => {
        if (!userLogin || isError) {
            history.push('/admin')
        }
    },[history, userLogin, isError])

    return (
    <>
        <h1 className="text-center">Edit Skill</h1>
            <form onSubmit={editUserSubmit} className="mb-5">
                <div className="form-group">
                    <label>User Name</label>
                    <input type="text" className="form-control" value={name} onChange={(event) => { setName(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={(event) => { setEmail(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={(event) => { setPassword(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Avatar</label>
                    <input type="text" className="form-control" value={avatar} onChange={(event) => { setAvatar(event.target.value) }}/>
                </div>
                <button type="submit" className="btn btn-primary mx-1">Submit</button>
                <Link className="btn btn-primary mx-1" to="/admin"> Back</Link>
            </form>
    </>
    )
}