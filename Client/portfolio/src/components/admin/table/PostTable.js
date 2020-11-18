import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import timeSince from '../../../helpers/timeFormat'

import { fetchAllPosts, deletePost, fetchAllPostCategory } from '../../../store/actions/admin'
import GridLoader from "react-spinners/GridLoader";

export default function PostTable() {
    const dispatch = useDispatch()

    const [isOnlyOne, setIsOnlyOne] = useState(false)

    const posts = useSelector((state) => state.adminReducer.posts)
    const postcategories = useSelector((state) => state.adminReducer.postcategories)
    const isLoading = useSelector((state) => state.adminReducer.isLoading)
    const isError = useSelector((state) => state.adminReducer.isError)
    const errorMessage = useSelector((state) => state.adminReducer.errorMessage)

    function deletePostClick(event, id) {
        event.preventDefault()
        if (posts.length > 1) {
            dispatch(deletePost(id))
            setIsOnlyOne(false)
        } else {
            setIsOnlyOne(true)
        }
    }

    useEffect(() => {
        if (posts.length === 0 || postcategories.length === 0) {
            dispatch(fetchAllPosts())
            dispatch(fetchAllPostCategory())
        }
    },[dispatch, posts, postcategories])

    if (isLoading) {
        return (
            <>
            <div className="d-flex align-items-center justify-content-center m-5">
                <GridLoader
                    size={30}
                    color={"black"}
                    loading={isLoading}
                />
            </div>
            </>
        )
    } else if (isError) {
        return (
            <>
                <div className="d-flex align-items-center justify-content-center m-5">
                    <h1 className="text-center">Oooops. this is awkward</h1>
                    <h1 className="text-center">{errorMessage}</h1>
                </div>
            </>
        )
    } else {
        return (
            <>
                <h1 className="text-center">Browse Blog</h1>
                <Link to="/admin/post/add"> Add New</Link>
                { isOnlyOne &&
                    <div className="alert alert-warning show" role="alert">
                        data just only one left, cant delete it
                        <button type="button" className="close" onClick={() => { setIsOnlyOne(false) }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Featured</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Updated At</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    { posts.map((post) => {
                        return <React.Fragment key={post.id}>
                            <tr>
                                <th scope="row">{post.title}</th>
                                <td>{post.featured ? 'yes' : 'no'}</td>
                                <td>{post.detail}</td>
                                <td>{timeSince(post.updatedAt)}</td>
                                <td>
                                    <Link className="btn btn-primary mx-1" to={'/admin/post/read/'+ post.id}> Read</Link>
                                    <Link className="btn btn-primary mx-1" to={'/admin/post/edit/'+ post.id}> Edit</Link>
                                    <button className="btn btn-primary mx-1" onClick={(event) => deletePostClick(event, post.id)}> Delete</button>
                                </td>
                            </tr>
                        </React.Fragment>
                    })}
                    </tbody>
                </table>
            </>
        )
    }
}