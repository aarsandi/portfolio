import React, {useEffect} from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import AdminNavbar from '../../components/admin/Navbar'
import SinglePost from '../../components/admin/single/SinglePost'
import SingleProject from '../../components/admin/single/SingleProject'

export default function Read() {
    const { pathname } = useLocation()
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
            history.push("/admin/login")
        }
    },[history])

    return (
        <>
            <AdminNavbar/>
            <div className="container">
                { pathname.slice(7, 11) === "post" &&     
                    <SinglePost/>
                }
                { pathname.slice(7, 14) === "project" &&     
                    <SingleProject/>
                }
            </div>
        </>
    )
}