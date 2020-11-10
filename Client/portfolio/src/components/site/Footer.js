import React from 'react'
// import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <>
            <footer>
                <div id="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-pb-sm">
                                <div className="row">
                                    <div className="col-md-10">
                                        <h2><a href="http://nothingtochance.co/" target="_blank">Ahmad Arsandi</a></h2>
                                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p>Javascript<br/>Frontend<br/>Backend<br/>Database<br/></p>
                                            </div>
                                            <div className="col-md-6">
                                                <p>VueJs<br/>ReactJs<br/>React Native<br/>Microservices<br/></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-pb-sm">
                                <h2> </h2>
                            </div>
                            <div className="col-md-4 col-pb-sm right-display">
                                <h2>My address</h2>
                                <p>
                                    <span className="block">
                                        88 West 21th Street, Suite 721 New York NY 10016 dsadwdawads<br/>
                                        <i className="fa fa-phone" aria-hidden="true"></i> +1235 2355 98<br/>
                                        <i className="fa fa-envelope-o" aria-hidden="true"></i> aarsandi@gmail.com<br/>
                                    </span>
                                </p>
                                <p className="app-social-icons">
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                    <a href="#"><i className="fa fa-github"></i></a>
                                    <a href="#"><i className="fa fa-whatsapp"></i></a>
                                    <a href="#"><i className="fa fa-linkedin"></i></a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}