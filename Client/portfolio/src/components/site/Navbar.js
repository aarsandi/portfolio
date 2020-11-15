import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    function onClickMenu(event) {
        event.preventDefault()
        document.getElementById('menu-bar').classList.toggle('change');
        document.getElementById('nav').classList.toggle('change-btn');
    }
    
    return (
        <>
            <div id="menu" className="menu">
                <div id="menu-bar" onClick={onClickMenu}>
                    <div id="bar1" className="bar"></div>
                    <div id="bar2" className="bar"></div>
                    <div id="bar3" className="bar"></div>
                    <ul id="nav" className="nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/projects">Project</Link></li>
                        <li><Link to="/admin">Admin</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}