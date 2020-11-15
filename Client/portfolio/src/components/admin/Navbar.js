import React , { useEffect }from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { setLogout, fetchDataHome } from '../../store/actions/admin'

export default function Navbar() {
    const history = useHistory()
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.adminReducer.userLogin)

    function logout(event) {
        event.preventDefault()
        dispatch(setLogout())
        localStorage.removeItem('access_token')
        history.push("/admin/login")
    }

    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
            history.push("/admin/login")
        } else if (userLogin.id === undefined) {
            dispatch(fetchDataHome())
        }
    },[history, dispatch, userLogin])
    return (
        <>
            <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
                {/* <Link className="navbar-brand" to="/admin">Home</Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb" aria-expanded="true">
                <span className="navbar-toggler-icon"></span>
                </button> */}
                <div id="navb" className="navbar-collapse collapse hide">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item float-left">
                            <Link className="nav-link" to="/admin">Home</Link>
                        </li>
                        <li className="nav-item float-left">
                            <Link className="nav-link" to="/admin/posts">Blog</Link>
                        </li>
                        <li className="nav-item float-left">
                            <Link className="nav-link" to="/admin/postcategories">Blog-Category</Link>
                        </li>
                        <li className="nav-item float-left">
                            <Link className="nav-link" to="/admin/projects">Project</Link>
                        </li>
                        <li className="nav-item float-left">
                            <Link className="nav-link" to="/admin/projectcategories">Project-Category</Link>
                        </li>
                        <li className="nav-item float-left">
                            <Link className="nav-link" to="/admin/skills">Skills</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav my-lg-0">
                        <li className="nav-item ">
                            <Link className="nav-link" to="/"> Site</Link>
                        </li>
                        <li className="nav-item dropdown float-right">
                            { userLogin.id && 
                                <>
                                    <div className="nav-link dropdown-toggle" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {userLogin.name}
                                    </div>
                                </>
                            }
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                                <Link className="dropdown-item" to="/admin">Account details</Link>
                                <button className="btn dropdown-item" onClick={logout}> Logout</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}