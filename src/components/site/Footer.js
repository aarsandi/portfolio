import React from 'react'
import {ReactComponent as NodeIcon} from '../../assets/node-dot-js.svg';
import {ReactComponent as PostgresIcon} from '../../assets/postgresql.svg';
import {ReactComponent as ReactIcon} from '../../assets/react.svg';
import {ReactComponent as RouterIcon} from '../../assets/reactrouter.svg';
import {ReactComponent as ReduxIcon} from '../../assets/redux.svg';

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
                                        <p>I am software developer with a recent emphasis on Javascript Fullstack Enginering.</p>
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
                                    <a href="https://github.com/aarsandi" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a>
                                    <a href="https://api.whatsapp.com/send?phone=6287889492390" target="_blank" rel="noopener noreferrer"><i className="fa fa-whatsapp"></i></a>
                                    <a href="https://www.linkedin.com/in/ahmad-arsandi-733ba711b/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a>
                                </p>
                                <h2 className="mt-4">Built With :</h2>
                                <p className="app-social-icons">
                                    <a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">
                                        <NodeIcon fill='white' stroke='white' width="50" height="40"/>
                                    </a>
                                    <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer">
                                        <PostgresIcon fill='black' stroke='white' width="50" height="40"/>
                                    </a>
                                    <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                                        <ReactIcon fill='white' stroke='white' width="50" height="40"/>
                                    </a>
                                    <a href="https://reactrouter.com/" target="_blank" rel="noopener noreferrer">
                                        <RouterIcon fill='white' stroke='white' width="50" height="40"/>
                                    </a>
                                    <a href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">
                                        <ReduxIcon fill='white' stroke='white' width="50" height="40"/>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}