import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { editPost, fetchOnePost } from '../../../store/actions/admin'

export default function EditPost() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()

    const post = useSelector((state) => state.adminReducer.post)
    const isLoading = useSelector((state) => state.adminReducer.isLoading)
    const isError = useSelector((state) => state.adminReducer.isError)

    const [title, setTitle] = useState('')
    const [detail, setDetail] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [images, setImages] = useState('')
    const [featured, setFeatured] = useState(true)
    const [PostCategories, setPostCategories] = useState([1,2])
    
    function editPostSubmit(event) {
        event.preventDefault()
        dispatch(editPost(id, { title, detail, content, image, images, featured, PostCategories }))
        history.push('/admin/posts')
    }

    useEffect(() => {
        dispatch(fetchOnePost(id))
    },[dispatch, id])

    if (isLoading) {
        return <h1>loading......</h1>
    } else if (isError) {
        return (
        <>
            <h1>Well, this is awkward</h1>
            <Link to="/" className="btn btn-primary">Home</Link>
        </>
        )
    } else {
        return (
            <>
                <h1 className="text-center">Edit Post</h1>
                <form onSubmit={editPostSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" placeholder={post.title} onChange={(event) => { setTitle(event.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label>detail</label>
                        <input type="text" className="form-control" placeholder={post.detail} onChange={(event) => { setDetail(event.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label>content</label>
                        <input type="text" className="form-control" placeholder={post.content} onChange={(event) => { setContent(event.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label>image</label>
                        <input type="text" className="form-control" placeholder={post.image} onChange={(event) => { setImage(event.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label>images</label>
                        <input type="text" className="form-control" placeholder={post.images} onChange={(event) => { setImages(event.target.value) }}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link className="nav-link" to="/admin"> Home</Link>
                </form>
            </>
        )
    }
}