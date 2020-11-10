import React from 'react'
// import { Link } from 'react-router-dom'

export default function Hire() {
    return (
        <>
            <div id="app-hire">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-md-offset-1 col-md-pull-1">
                            <h2 className="heading">Are you looking for a web developer?</h2>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Name"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Email"/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <textarea name="" className="form-control" id="" cols="30" rows="7" placeholder="Message"></textarea>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="submit" value="Send Message" className="btn btn-primary"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}