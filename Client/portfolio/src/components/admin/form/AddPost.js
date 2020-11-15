import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Multiselect } from 'multiselect-react-dropdown'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import { addPost, fetchAllPostCategory } from '../../../store/actions/admin'

export default function AddPost() {
    const history = useHistory()
    const dispatch = useDispatch()
    const isError = useSelector((state) => state.adminReducer.isError)
    const postcategories = useSelector((state) => state.adminReducer.postcategories)
    const errorMessage = useSelector((state) => state.adminReducer.errorMessage)

    const [title, setTitle] = useState('')
    const [detail, setDetail] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [images, setImages] = useState('')
    const [featured, setFeatured] = useState(String(0))
    const [ recentPostCategories, setRecentPostCategories ] = useState([])
    
    function addPostSubmit(event) {
        event.preventDefault()
        let PostCategories = []
        if (recentPostCategories.length > 0) {
            recentPostCategories.forEach(data => {
                PostCategories.push(data.id)
            })
        }
        dispatch(addPost({ title, detail, content, image, images, featured, PostCategories }))
        history.push('/admin/posts')
    }

    useEffect(() => {
        if (postcategories.length === 0) {
            dispatch(fetchAllPostCategory())
        }
    },[dispatch, postcategories])

    return (
        <>
            <h1 className="text-center">Add Post</h1>
            <form onSubmit={addPostSubmit} className="mb-5">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" onChange={(event) => { setTitle(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>detail</label>
                    <input type="text" className="form-control" onChange={(event) => { setDetail(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <CKEditor 
                        editor={ClassicEditor}
                        data={content}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setContent(data)
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>image</label>
                    <input type="text" className="form-control" onChange={(event) => { setImage(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>images</label>
                    <input type="text" className="form-control" onChange={(event) => { setImages(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Featured</label>
                    <select className="form-control" value={featured} onChange={(event) => { setFeatured(Number(event.target.value)) }}>
                        <option value="1">yes</option>
                        <option value="0">no</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Post Category</label>
                    { postcategories.length > 0 && 
                        <Multiselect options={postcategories}
                            onRemove={(selectedList) => {
                                setRecentPostCategories(selectedList)
                            }}
                            onSelect={(selectedList) => {
                                setRecentPostCategories(selectedList)
                            }}
                            displayValue="title"
                        />
                    }
                    { isError && 
                        <>
                            <h1>Cannot fetching data please refresh</h1>
                            <h1>{errorMessage.error}</h1>
                        </>
                    }
                </div>
                <button type="submit" className="btn btn-primary mx-1">Submit</button>
                <Link className="btn btn-primary mx-1" to="/admin/posts"> Back</Link>
            </form>
        </>
    )
}