import React from 'react'
import { Link } from 'react-router-dom'

export default function FeaturedProject({project}) {
    return (
        <>
            <div className="col-md-6 text-center">
                <Link to={'/project/'+ project.id} className="project-img" style={{ backgroundImage: "url('/assets/projects/work-1.jpg')" }}>
                    <div className="overlay"></div>
                    <div className="desc">
                        <p className="tag"><span>Illustration</span>, <span>Logo</span></p>
                        <h3>{project.title}</h3>
                        <p className="tag">{project.detail}</p>
                        <span className="read-more">Read more <i className="icon-arrow-right3"></i></span>
                    </div>
                </Link>
            </div>
        </>
    )
}