import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import Footer from '../../components/site/Footer'
import Navbar from '../../components/site/Navbar'
import Hire from '../../components/site/Hire'

import { fetchOneProject } from '../../store/actions/site'

export default function ProjectSingle() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const project = useSelector((state) => state.siteReducer.project)
    const isLoading = useSelector((state) => state.siteReducer.isLoading)
    const isError = useSelector((state) => state.siteReducer.isError)

    useEffect(() => {
        dispatch(fetchOneProject(id))
    },[dispatch, id])

    if (isLoading) {
        return <h1>loading......</h1>
    } else if (isError) {
        return (
        <>
            <h1>Well, this is awkward</h1>
            <Link to="/" className="btn btn-primary">Home</Link>
        </>
        )
    } else {
        return (
            <>
                <div id="app">
                    <aside className="hero">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 col-sm-12 col-md-offset-2 col-md-pull-2 hero-text">
                                    <div className="hero-text-inner">
                                        <h1>{project.title}</h1>
                                        <h2>Done Project</h2>
                                        <p><Link to="/" className="btn btn-primary btn-learn">Back to Home</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div id="app-project">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7">
                                {/* { project.images.map((image, index) => {
                                    return <React.Fragment key={index}>
                                    </React.Fragment>
                                })} */}
                                <img className="img-fluid mb-3" src="hjhj" alt="work"/>
                                </div>
                                <div className="col-md-4 col-md-push-1">
                                    <div className="project-detail">
                                        <p className="tag"><span>Illustration</span>, <span>Logo</span></p>
                                        <h2>{project.detail}</h2>
                                        <div dangerouslySetInnerHTML={{__html: project.content}} />
                                        <p><a href="https://github.com/aarsandi" className="btn btn-primary">View Live Preview</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <h2>Related Works</h2>
                                </div>
                                <div className="col-md-6 text-center">
                                    <a href="work-single.html" className="project-img" style={{ backgroundImage: "url('/assets/project-demo.jpg')" }}>
                                        <div className="overlay"></div>
                                        <div className="desc">
                                            <span className="icon"><i className="icon-heart-outline"></i></span>
                                            <p className="tag"><span>Illustration</span>, <span>Logo</span></p>
                                            <h3>Work 01</h3>
                                            <span className="read-more">Read more <i className="icon-arrow-right3"></i></span>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-md-6 text-center">
                                    <a href="work-single.html" className="project-img" style={{ backgroundImage: "url('/assets/project-demo.jpg')" }}>
                                        <div className="overlay"></div>
                                        <div className="desc">
                                            <span className="icon"><i className="icon-heart-outline"></i></span>
                                            <p className="tag"><span>Web Design</span>, <span>UI</span></p>
                                            <h3>Work 02</h3>
                                            <span className="read-more">Read more <i className="icon-arrow-right3"></i></span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Hire/>
                    <Footer/>
                </div>
            </>
        )
    }
}