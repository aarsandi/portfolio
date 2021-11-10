import React from 'react'
import { Link } from 'react-router-dom'

export default function FeaturedProject({project}) {
    return (
        <>
            <div className="col text-center">
                <Link to={'/project/'+ project.id} className="project-img" style={{ backgroundImage: `url('${project.image}')` }}>
                    <div className="overlay"></div>
                    <div className="desc">
                        <p className="tag">
                            {/* {
                                project.ProjectCategories.map((data, index) => {
                                    return <React.Fragment key={index}>
                                        <span>{data.title} </span>
                                    </React.Fragment>
                            })} */}
                        </p>
                        <h3>{project.title}</h3>
                        <p className="tag">{project.detail}</p>
                        <span className="read-more">Read more <i className="icon-arrow-right3"></i></span>
                    </div>
                </Link>
            </div>
        </>
    )
}