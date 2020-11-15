import React, {useEffect} from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import AdminNavbar from '../../components/admin/Navbar'
import AddPost from '../../components/admin/form/AddPost'
import AddProject from '../../components/admin/form/AddProject'
import AddPostCategory from '../../components/admin/form/AddPostCategory'
import AddProjectCategory from '../../components/admin/form/AddProjectCategory'

export default function Add() {
    const { pathname } = useLocation()
    const history = useHistory()

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
                    <AddPost/>
                }
                { pathname.slice(7, 14) === "project" &&     
                    <AddProject/>
                }
                { pathname.slice(7, 17) === "catproject" &&     
                    <AddProjectCategory/>
                }
                { pathname.slice(7, 14) === "catpost" &&     
                    <AddPostCategory/>
                }
            </div>
        </>
    )
}