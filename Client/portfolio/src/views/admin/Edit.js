import React, {useEffect} from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import AdminNavbar from '../../components/admin/Navbar'
import EditPost from '../../components/admin/form/EditPost'
import EditProject from '../../components/admin/form/EditProject'

export default function Edit() {
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
                    <EditPost/>
                }
                { pathname.slice(7, 14) === "project" &&     
                    <EditProject/>
                }
            </div>
        </>
    )
}