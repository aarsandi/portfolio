import React from 'react'
// import { Link } from 'react-router-dom'

import Footer from '../../components/site/Footer'
import Navbar from '../../components/site/Navbar'

export default function PostSingle({project}) {
    return (
        <>
            <Navbar/>
            <div id="app">
                <aside className="hero">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-sm-12 col-md-offset-2 col-md-pull-2 hero-text">
                                <div className="hero-text-inner">
                                    <h1>Post 1</h1>
                                    <h2>detail</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                <div id="app-blog">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-md-offset-0">
                                <article className="blog-entry">
                                    <div className="blog-wrap">
                                        <div className="blog-image">
                                            <a href="blog.html" className="blog-img text-center" style={{ backgroundImage: "url('/assets/posts/blog-2.jpg')" }}><span><i className="icon-link"></i></span></a>
                                        </div>
                                        <h2 className="text-center"><a href="blog.html">Little Blind Text should turn around</a></h2>	
                                    </div>
                                    <div className="desc">
                                        <span className="category"><a href="blog.html"><i className="icon-calendar2"></i> January 27, 2017</a> <a href="blog.html" className="posted-by"><i className="icon-user2"></i> by Stephy</a> <a href="blog.html"><i className="icon-bubble3"></i> 5 Comments</a></span>
                                        <p className="first-letra">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way.</p>
                                    </div>
                                    <p className="text-center"><a href="blog.html" className="btn btn-primary btn-custom">Continue Reading</a></p>
                                </article>
                                
                                {/* <div className="row">
                                    <div className="col-md-12 text-center">
                                        <ul className="pagination">
                                            <li className="disabled"><a href="#">&laquo;</a></li>
                                            <li className="active"><a href="#">1</a></li>
                                            <li><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a href="#">4</a></li>
                                            <li><a href="#">&raquo;</a></li>
                                        </ul>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    )
}