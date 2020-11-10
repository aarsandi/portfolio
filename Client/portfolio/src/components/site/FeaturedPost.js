import React from 'react'
import { Link } from 'react-router-dom'

export default function FeaturedPost({post}) {
    return (
        <>
            <div className="col-md-6">
                <Link to={'/post/'+ post.id} className="f-blog">
                    <p className="meta"><span>Brand Content</span> | <span>26 January 2017</span></p>
                    <h3>{post.title}</h3>
                    <p className="read-more">Read more <i className="icon-arrow-right3"></i></p>
                </Link>
            </div>
        </>
    )
}