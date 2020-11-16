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
                                        <h2><a href="http://nothingtochance.co/" target="_blank" rel="noopener noreferrer">Ahmad Arsandi</a></h2>
                                        <p>I am software developer with a recent emphasis on Javascript Fullstack Enginering and more interested in frontend developers.</p>
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
                                <h2>Contact Me</h2>
                                <p>
                                    <span className="block">
                                        Jln. Melati III, NO.22<br/> Perwirasari Bekasi Utara 17122<br/>
                                        <i className="fa fa-phone" aria-hidden="true"></i> +62878 1219 1920<br/>
                                        <i className="fa fa-envelope-o" aria-hidden="true"></i> aarsandi@gmail.com<br/>
                                    </span>
                                </p>
                                <p className="app-social-icons">
                                    <a href="https://www.facebook.com/ahmadarsandiyeah/" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
                                    <a href="https://github.com/aarsandi" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a>
                                    <a href="https://api.whatsapp.com/send?phone=6287812191920" target="_blank" rel="noopener noreferrer"><i className="fa fa-whatsapp"></i></a>
                                    <a href="https://www.linkedin.com/in/ahmad-arsandi-733ba711b/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}