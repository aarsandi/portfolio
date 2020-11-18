import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function SinglePost() {
    const history = useHistory()
    const userLogin = useSelector((state) => state.adminReducer.userLogin)
    const isError = useSelector((state) => state.adminReducer.isError)

    useEffect(() => {
        if (!userLogin || isError) {
            history.push('/admin')
        }
    },[history, userLogin, isError])

    return (
        <>
            <h1 className="text-center">Single User</h1>
            { userLogin &&
                <>
                    <h1 className="text-center">id: {userLogin.id}</h1>
                    <h1 className="text-center">username: {userLogin.name}</h1>
                    <h1 className="text-center">email: {userLogin.email}</h1>
                    <h1 className="text-center">avatar: {userLogin.avatar}</h1>
                </>
            }
        </>
    )    
}