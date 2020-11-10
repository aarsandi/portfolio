import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'

import Navbar from '../../components/site/Navbar'
import FeaturedProject from '../../components/site/FeaturedProject'
import Footer from '../../components/site/Footer'
import Hire from '../../components/site/Hire'

import { fetchAllProjects } from '../../store/actions/site'

export default function Projects() {
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.siteReducer.projects)
    const isLoading = useSelector((state) => state.siteReducer.isLoading)
    const isError = useSelector((state) => state.siteReducer.isError)

    useEffect(() => {
        dispatch(fetchAllProjects())
    },[dispatch])

    if (isLoading) {
        return <h1>loading......</h1>
    } else if (isError) {
        return (
        <>
            <Navbar/>
            <h1>Well, this is awkward</h1>
        </>
        )
    } else if (projects) {
        return (
            <>
                <Navbar/>
                <div id="app">
                    <div id="app-project">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12 col-md-offset-2 text-center intro-heading">
                                    <h2>My Projects</h2>
                                </div>
                            </div>
                            <div className="row row-padded-bottom">
                            { projects.map((project) => {
                                return <FeaturedProject key={project.id} project={project}/>
                            })}
                            </div>
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

                    <Hire/>
                    <Footer/>
                </div>
            </>
        )
    }
}