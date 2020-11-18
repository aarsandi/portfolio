import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import Navbar from '../../components/site/Navbar'
import FeaturedProject from '../../components/site/FeaturedProject'
import Hire from '../../components/site/Hire'
import Footer from '../../components/site/Footer'

import { fetchHomeData } from '../../store/actions/site'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import GridLoader from "react-spinners/GridLoader";

export default function Home() {
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.siteReducer.featuredprojects)
    const skills = useSelector((state) => state.siteReducer.skills)
    const isLoading = useSelector((state) => state.siteReducer.isLoading)

    let settings = {
        rows: 2,
        dots: true,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2
    };

    useEffect(() => {
        if (projects.length === 0) {
            dispatch(fetchHomeData())
        }
    },[dispatch, projects])

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
                        <div className="d-flex align-items-center justify-content-center m-3">
                            <GridLoader
                                size={30}
                                color={"black"}
                                loading={isLoading}
                            />
                        </div>
                        <div className="row">
                        { !isLoading &&
                        <>
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
                        </>
                        }
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
                        <div className="d-flex align-items-center justify-content-center m-5">
                            <GridLoader
                                size={30}
                                color={"black"}
                                loading={isLoading}
                            />
                        </div>
                        {!isLoading && 
                            <Slider {...settings}>
                            { projects.map((project) => {
                                return <FeaturedProject key={project.id} project={project}/>
                            })}
                            </Slider>
                        }
                        <div className="text-center mt-5">
                            <a href="https://github.com/aarsandi" target="_blank" rel="noopener noreferrer" className="btn btn-primary">See more on Github</a>
                        </div>
                    </div>
                </div>
                <Hire/>
                <Footer/>
            </div>
        </>
    )
}