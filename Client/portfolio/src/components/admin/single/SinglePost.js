import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import timeSince from '../../../helpers/timeFormat'

import { fetchOnePost } from '../../../store/actions/admin'
import GridLoader from "react-spinners/GridLoader";

export default function SinglePost() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const post = useSelector((state) => state.adminReducer.post)
    const isLoading = useSelector((state) => state.adminReducer.isLoading)
    const isError = useSelector((state) => state.adminReducer.isError)

    useEffect(() => {
        dispatch(fetchOnePost(id))
    },[dispatch, id])

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
            <Link to="/admin" className="btn btn-primary">Home</Link>
        </>
        )
    } else {
        return (
            <>
            <div className="row mx-2 my-5">
                <div className="col-9">
                    <h1>Title :</h1>
                    <h3>{post.title}</h3>
                    <h1>Detail :</h1>
                    <h3>{post.detail}</h3>
                    <h1>Content :</h1>
                    <div dangerouslySetInnerHTML={{__html: post.content}} />
                </div>
                <div className="col-3">
                    <div className="row">
                        <div className="col-12 card p-0 mb-2">
                            <div className="card-header">
                                Field
                            </div>
                            <div className="card-body">
                                <h4>id: {post.id}</h4>
                                <h4>featured: <span className="badge badge-primary">{post.featured ? 'true' : 'false'}</span></h4>
                                <h4>created at: {timeSince(post.createdAt)}</h4>
                                <h4>updated at: {timeSince(post.updatedAt)}</h4>
                            </div>
                        </div>
                        <div className="col-12 card p-0 mb-2">
                            <div className="card-header">
                                Image
                            </div>
                            <div className="card-body">
                                <h4>image : </h4><img src={post.image} alt="img" width="100%"/>
                            </div>
                        </div>
                        <div className="col-12 card p-0">
                            <div className="card-header">
                                Images
                            </div>
                            <div className="card-body">
                                <h4>images : <span className="badge badge-primary">{post.images ? JSON.parse(post.images).length + ' items' : '0 items'}</span></h4>
                                { post.images &&
                                    JSON.parse(post.images).map((image, index) => {
                                    return <React.Fragment key={index}>
                                        <img className="mb-1" src={image} alt="img" width="100%"/>
                                    </React.Fragment>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
    
}