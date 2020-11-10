import React, {useEffect} from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import AdminNavbar from '../../components/admin/Navbar'
import ProjectTable from '../../components/admin/table/ProjectTable'
import PostTable from '../../components/admin/table/PostTable'

export default function Browse() {
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
                {pathname.slice(7, 12) === "posts" &&     
                    <PostTable/>
                }
                {pathname.slice(7, 15) === "projects" &&     
                    <ProjectTable/>
                }
            </div>
        </>
    )
}