import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { fetchDataHome } from '../../store/actions/admin'
import AdminNavbar from '../../components/admin/Navbar'


export default function Home() {
    const history = useHistory();
    const dispatch = useDispatch()

    const posts = useSelector((state) => state.adminReducer.posts)
    const projects = useSelector((state) => state.adminReducer.projects)
    const isLoading = useSelector((state) => state.adminReducer.isLoading)
    const isError = useSelector((state) => state.adminReducer.isError)
    const errorMessage = useSelector((state) => state.adminReducer.errorMessage)

    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
            history.push("/admin/login")
        } else if (posts.length == 0 || projects.length == 0) {
            dispatch(fetchDataHome())
        }
    },[history, dispatch, posts, projects])

    return (
        <>
            <AdminNavbar/>
            <div className="container">
                <h1 className="text-center">Admin Dashboard</h1>
                { isLoading &&
                    <h1>Loading.....</h1>
                }
                { isError &&
                <>
                    <h1>{errorMessage}</h1>
                    <Link className="nav-link" to="/">Visit site</Link>
                </>
                }
                <div className="card m-3">
                    <div className="card-body">
                        You have {posts.length} Post
                        <Link className="nav-link" to="/admin/posts">Posts list</Link>
                    </div>
                </div>
                <div className="card m-3">
                    <div className="card-body">
                        You have {projects.length} Project
                        <Link className="nav-link" to="/admin/projects">Projects list</Link>
                    </div>
                </div>
            </div>
        </>
    )
}