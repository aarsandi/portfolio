import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { fetchDataHome } from '../../store/actions/admin'
import AdminNavbar from '../../components/admin/Navbar'
import GridLoader from "react-spinners/GridLoader";

export default function Home() {
    const history = useHistory();
    const dispatch = useDispatch()

    const posts = useSelector((state) => state.adminReducer.posts)
    const projects = useSelector((state) => state.adminReducer.projects)
    const isLoading = useSelector((state) => state.adminReducer.isLoading)
    const isError = useSelector((state) => state.adminReducer.isError)
    const errorMessage = useSelector((state) => state.adminReducer.errorMessage)

    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            history.push("/admin/login")
        } else if (!posts.length || !projects.length) {
            dispatch(fetchDataHome())
        }
    },[history, dispatch, posts, projects])

    if (isLoading) {
        return (
            <>
            <div className="d-flex align-items-center justify-content-center m-5">
                <GridLoader
                    size={30}
                    color={"black"}
                    loading={isLoading}
                />
            </div>
            </>
        )
    } else if (isError) {
        return (
            <>
                <div className="d-flex align-items-center justify-content-center m-5">
                    <h1 className="text-center">Oooops. this is awkward</h1>
                    <h1 className="text-center">{errorMessage}</h1>
                </div>
            </>
        )
    } else {
        return (
            <>
                <AdminNavbar/>
                <div className="container">
                    <h1 className="text-center">Admin Dashboard</h1>
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
}