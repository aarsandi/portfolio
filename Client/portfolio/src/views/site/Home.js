import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'

import Navbar from '../../components/site/Navbar'
import FeaturedProject from '../../components/site/FeaturedProject'
import Footer from '../../components/site/Footer'
import Hire from '../../components/site/Hire'

import { fetchHomeData } from '../../store/actions/site'

export default function Home() {
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.siteReducer.projects)
    const posts = useSelector((state) => state.siteReducer.posts)
    const skills = useSelector((state) => state.siteReducer.skills)
    const isLoading = useSelector((state) => state.siteReducer.isLoading)
    const isError = useSelector((state) => state.siteReducer.isError)
    const errorMessage = useSelector((state) => state.siteReducer.errorMessage)

    useEffect(() => {
        dispatch(fetchHomeData())
    },[dispatch])

    if (isError) {
        return (
        <>
            <Navbar/>
            <h1>Well, this is awkward</h1>
            <h1>{errorMessage.error}</h1>
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
                            { skills.map((skill) => {
                                return <React.Fragment key={skill.id}>
                                    <div className="col-md-4">
                                        <div className="skills">
                                            <span className="icon"><i className={skill.icon}></i></span>
                                            <div className="desc">
                                                <h3>{skill.title}</h3>
                                                <p>{skill.detail}</p>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            })}
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
                    <Hire/>
                    <Footer/>
                </div>
            </>
        )
    }
}