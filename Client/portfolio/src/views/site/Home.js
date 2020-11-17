import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import Navbar from '../../components/site/Navbar'
import FeaturedProject from '../../components/site/FeaturedProject'
import Footer from '../../components/site/Footer'

import { fetchHomeData } from '../../store/actions/site'

export default function Home() {
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.siteReducer.projects)
    const skills = useSelector((state) => state.siteReducer.skills)
    const isLoading = useSelector((state) => state.siteReducer.isLoading)

    useEffect(() => {
        dispatch(fetchHomeData())
    },[dispatch])

    return (
        <>
            <div id="app">
                <aside className="hero">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-sm-12 col-md-offset-2 col-md-pull-2 hero-text">
                                <div className="hero-text-inner">
                                    <h2>Welcome &amp; Enjoy</h2>
                                    <h1>Hello! I'm Sandi, a Fresh graduated fullstack developer</h1>
                                    <p><a href="#footer" className="btn btn-primary btn-learn">Available For Hire!</a></p>
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
                        { isLoading && <h2>Loading....</h2> }
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
                        { isLoading && <h2>Loading....</h2> }
                        { projects.map((project) => {
                            return <FeaturedProject key={project.id} project={project}/>
                        })}
                        </div>
                        <div className="text-center">
                            <a href="https://github.com/aarsandi" target="_blank" rel="noopener noreferrer" className="btn btn-primary">See more on Github</a>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    )
}