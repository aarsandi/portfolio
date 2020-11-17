import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { fetchOnePost } from '../../../store/actions/admin'

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
        return <h1>loading......</h1>
    } else if (isError) {
        return (
        <>
            <h1>Well, this is awkward</h1>
            <Link to="/admin" className="btn btn-primary">back to home or try refresh</Link>
        </>
        )
    } else {
        return (
            <>
                <h1 className="text-center">Single Post</h1>
                <h1 className="text-center">id: {post.id}</h1>
                <h1 className="text-center">title: {post.title}</h1>
                <h1 className="text-center">detail: {post.detail}</h1>
                <h1 className="text-center">Content: </h1>
                <div dangerouslySetInnerHTML={{__html: post.content}} />
                <h1>image : </h1><img src={post.image}/>
                <h1>images : {post.images ? JSON.parse(post.images).length + ' items' : '0 items'}</h1>
                { post.images &&
                    JSON.parse(post.images).map((image, index) => {
                    return <React.Fragment key={index}>
                        <img src={image} alt="img"/>
                    </React.Fragment>
                    })
                }
                <h1 className="text-center">featured: {post.featured ? 'true' : 'false'}</h1>
                <h1 className="text-center">created at: {post.createdAt}</h1>
                <h1 className="text-center">updated at: {post.updatedAt}</h1>
            </>
        )
    }
    
}