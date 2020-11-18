import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import Footer from '../../components/site/Footer'
// import Navbar from '../../components/site/Navbar'
import Hire from '../../components/site/Hire'
import FeaturedProject from '../../components/site/FeaturedProject'

import { fetchOneProject, fetchHomeData } from '../../store/actions/site'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GridLoader from "react-spinners/GridLoader";

export default function ProjectSingle() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const project = useSelector((state) => state.siteReducer.project)
    const projects = useSelector((state) => state.siteReducer.featuredprojects)
    const isLoading = useSelector((state) => state.siteReducer.isLoading)
    const isError = useSelector((state) => state.siteReducer.isError)

    let settings = {
        dots: true,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2
    };

    useEffect(() => {
        dispatch(fetchOneProject(id))
        if (projects.length === 0) {
            dispatch(fetchHomeData())
        }
    },[dispatch, id, projects])

    if (isLoading) {
        return (
            <div className="d-flex align-items-center justify-content-center m-5">
                <GridLoader
                    size={30}
                    color={"black"}
                    loading={isLoading}
                />
            </div>
        )
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
                                        <h2>{project.isdone ? 'Done Project' : 'Under Construction'}</h2>
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
                                <img className="img-fluid mb-3" src={project.image} alt="work"/>
                                { project.images && 
                                    JSON.parse(project.images).map((image, index) => {
                                        return <React.Fragment key={index}>
                                            <img className="img-fluid mb-3" src={image} alt="work"/>
                                        </React.Fragment>

                                })}
                                </div>
                                <div className="col-md-4 col-md-push-1">
                                    <div className="project-detail">
                                        <h2>{project.title}</h2>
                                        <p className="tag">
                                        { project.ProjectCategories && 
                                            project.ProjectCategories.map((data, index) => {
                                                return <React.Fragment key={index}>
                                                    <span>{data.title} </span>
                                                </React.Fragment>
                                        })}
                                        </p>
                                        <div dangerouslySetInnerHTML={{__html: project.content}} />
                                        { project.gitlink && <p><a href={project.gitlink} className="btn btn-primary">Repository</a></p> }
                                        { project.demolink && <p><a href={project.demolink} className="btn btn-primary">View Live Preview</a></p> }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid mt-5">
                            <div className="row">
                                <div className="col-md-12 col-md-offset-2 text-center intro-heading">
                                    <h2>Related Project</h2>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center m-5">
                                <GridLoader
                                    size={30}
                                    color={"black"}
                                    loading={isLoading}
                                />
                            </div>
                            <Slider {...settings}>
                            { projects.map((project) => {
                                return <FeaturedProject key={project.id} project={project}/>
                            })}
                            </Slider>
                            <div className="text-center mt-5">
                                <a href="https://github.com/aarsandi?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn btn-primary">See more on Github</a>
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