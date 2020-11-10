import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'

import Navbar from '../../components/site/Navbar'
import FeaturedProject from '../../components/site/FeaturedProject'
import FeaturedPost from '../../components/site/FeaturedPost'
import Footer from '../../components/site/Footer'
import Hire from '../../components/site/Hire'

import { fetchHomeData } from '../../store/actions/site'

export default function Home() {
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.siteReducer.projects)
    const posts = useSelector((state) => state.siteReducer.posts)
    const isLoading = useSelector((state) => state.siteReducer.isLoading)
    const isError = useSelector((state) => state.siteReducer.isError)

    useEffect(() => {
        dispatch(fetchHomeData())
    },[dispatch])

    if (isError) {
        return (
        <>
            <Navbar/>
            <h1>Well, this is awkward</h1>
        </>
        )
    } else if (isLoading) {
        return <h1>loading......</h1>
    } else if (projects && posts) {
        return (
            <>
                <Navbar/>
                <div id="app">
                    <aside className="hero">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 col-sm-12 col-md-offset-2 col-md-pull-2 hero-text">
                                    <div className="hero-text-inner">
                                        <h2>Welcome &amp; Enjoy</h2>
                                        <h1>Hello! I'm Sandi, a fullstack developer from Indonesia</h1>
                                        <p><a href="#app-hire" className="btn btn-primary btn-learn">Available For Hire!</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div id="app-services">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-md-offset-2 text-center intro-heading">
                                    <h2>My Skills</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="skills">
                                        <span className="icon"><i className="fa fa-code"></i></span>
                                        <div className="desc">
                                            <h3>Fullstack Developer</h3>
                                            <p>Separated they live in Bookmarksgrove right at the coast</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="skills">
                                        <span className="icon"><i className="fa fa-desktop"></i></span>
                                        <div className="desc">
                                            <h3>Frontend Developer</h3>
                                            <p>Separated they live in Bookmarksgrove right at the coast</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="skills">
                                        <span className="icon"><i className="fa fa-server"></i></span>
                                        <div className="desc">
                                            <h3>Backend Developer</h3>
                                            <p>Separated they live in Bookmarksgrove right at the coast</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="skills">
                                        <span className="icon"><i className="fa fa-warning"></i></span>
                                        <div className="desc">
                                            <h3>Unit Testing</h3>
                                            <p>Separated they live in Bookmarksgrove right at the coast</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="skills">
                                        <span className="icon"><i className="fa fa-database"></i></span>
                                        <div className="desc">
                                            <h3>Database</h3>
                                            <p>Separated they live in Bookmarksgrove right at the coast</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="skills">
                                        <span className="icon"><i className="fa fa-wrench"></i></span>
                                        <div className="desc">
                                            <h3>Help &amp; Support</h3>
                                            <p>Separated they live in Bookmarksgrove right at the coast</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="app-project">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12 col-md-offset-2 text-center intro-heading">
                                    <h2>My Projects</h2>
                                </div>
                            </div>
                            <div className="row">
                            { projects.map((project) => {
                                return <FeaturedProject key={project.id} project={project}/>
                            })}
                            </div>
                        </div>
                    </div>

                    <div id="app-blog">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12 col-md-offset-2 text-center intro-heading">
                                    <h2>Blog</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="blog-flex">
                                    <div className="one-forth blog-img">
                                    </div>
                                    <div className="three-forth">
                                        <div className="row">
                                        { posts.map((post) => {
                                            return <FeaturedPost key={post.id} post={post}/>
                                        })}
                                        </div>
                                        {/* <div className="container">
                                            <div className="row">
                                                <p className="prev-next">
                                                    <a href="#" className="previous text-left"><i className="icon-arrow-left4"></i> Previous</a>
                                                    <a href="#" className="next text-right">Next <i className="icon-arrow-right4"></i></a>
                                                </p>
                                            </div>
                                        </div> */}
                                    </div>
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