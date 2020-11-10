import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function Navbar() {
    const history = useHistory()
    function logout(event) {
        event.preventDefault()
        localStorage.removeItem('access_token')
        history.push("/admin/login")
    }
    return (
        <>
            <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
                <Link className="navbar-brand" to="/admin">Home</Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb" aria-expanded="true">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navb" className="navbar-collapse collapse hide">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item float-left">
                            <Link className="nav-link" to="/admin/projects">Project</Link>
                        </li>
                        <li className="nav-item float-left">
                            <Link className="nav-link" to="/admin/posts">Post</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav my-lg-0">
                        <li className="nav-item ">
                            <Link className="nav-link" to="/"> Site</Link>
                        </li>
                        <li className="nav-item dropdown float-right">
                            <Link className="nav-link dropdown-toggle" to="/admin" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Account
                            </Link>
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