import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { addPost } from '../../../store/actions/admin'

export default function AddPost() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [detail, setDetail] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [images, setImages] = useState('')
    const [featured, setFeatured] = useState(false)
    const [PostCategories, setPostCategories] = useState([1,2])

    function addPostSubmit(event) {
        event.preventDefault()
        dispatch(addPost({ title, detail, content, image, images, featured, PostCategories }))
        history.push('/admin/posts')
    }
    return (
        <>
            <h1 className="text-center">Add Post</h1>
            <form onSubmit={addPostSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" onChange={(event) => { setTitle(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>detail</label>
                    <input type="text" className="form-control" onChange={(event) => { setDetail(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>content</label>
                    <input type="text" className="form-control" onChange={(event) => { setContent(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>image</label>
                    <input type="text" className="form-control" onChange={(event) => { setImage(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>images</label>
                    <input type="text" className="form-control" onChange={(event) => { setImages(event.target.value) }}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="nav-link" to="/admin"> Home</Link>
            </form>
        </>
    )
}