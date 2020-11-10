import React, {useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import AdminNavbar from '../../components/admin/Navbar'

export default function Home() {
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
                <h1 className="text-center">Admin Dashboard</h1>
                <div className="card">
                    <div className="card-body">
                        You have 21 Post (masih static)
                        <Link className="nav-link" to="/admin/posts">Posts list</Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        You have 21 Project (masih static)
                        <Link className="nav-link" to="/admin/projects">Projects list</Link>
                    </div>
                </div>
            </div>
        </>
    )
}