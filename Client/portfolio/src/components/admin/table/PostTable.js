import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchAllPosts, deletePost } from '../../../store/actions/admin'

export default function PostTable() {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.adminReducer.posts)
    const isLoading = useSelector((state) => state.adminReducer.isLoading)
    const isError = useSelector((state) => state.adminReducer.isError)
    const errorMessage = useSelector((state) => state.adminReducer.errorMessage)

    function deletePostClick(event, id) {
        event.preventDefault()
        dispatch(deletePost(id))
    }

    useEffect(() => {
        dispatch(fetchAllPosts())
    },[dispatch])

    if (isError) {
        return (
        <>
            <h1>Well, this is awkward</h1>
            <h1>{errorMessage.error}</h1>
            <Link to="/" className="btn btn-primary">Home</Link>
        </>
        )
    } else if (isLoading) {
        return <h1>loading......</h1>
    } else {
        return (
            <>
                <h1 className="text-center">Browse Posts</h1>
                <Link to="/admin/post/add"> Add</Link>
                <select className="float-right">
                    <option value="" defaultValue disabled hidden>Sort by</option>
                    <option>ascending</option>
                    <option>descending</option>
                </select>
                <input className="float-right" type="text" placeholder="Search.."/>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Detail</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    { posts.map((post) => {
                        return <React.Fragment key={post.id}>
                            <tr>
                                <th scope="row">{post.id}</th>
                                <td>{post.title}</td>
                                <td>{post.detail}</td>
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