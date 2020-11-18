import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Multiselect } from 'multiselect-react-dropdown'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import { addPost, fetchAllPostCategory } from '../../../store/actions/admin'
import { app } from '../../../base'

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
    const [recentImages, setRecentImages] = useState([])
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
        let images = JSON.stringify(recentImages)
        dispatch(addPost({ title, detail, content, image, images, featured, PostCategories }))
        history.push('/admin/posts')
    }

    const onImageChange = async (event) => {
        const filename = event.target.files[0]
        const storageRef = app.storage().ref()
        const date = new Date().toDateString()
        const fileRef = storageRef.child(`posts/${date}/${filename.name}`)
        await fileRef.put(filename)
        setImage(await fileRef.getDownloadURL())
    }
    const onDeleteImage = async (event, image) => {
        event.preventDefault()
        const storageRef = app.storage().refFromURL(image)
        await storageRef.delete()
        setImage('')
    }
    const onImagesChange = async (event) => {
        const filename = event.target.files[0]
        const storageRef = app.storage().ref()
        const date = new Date().toDateString()
        const fileRef = storageRef.child(`posts/${date}/${filename.name}`)
        await fileRef.put(filename)
        setRecentImages(recentImages.concat(await fileRef.getDownloadURL()))
    }

    const onDeleteImages = async (event, image) => {
        event.preventDefault()
        const storageRef = app.storage().refFromURL(image)
        await storageRef.delete()
        setRecentImages(recentImages.filter(d => d !== image))
    }

    useEffect(() => {
        if (postcategories.length === 0) {
            dispatch(fetchAllPostCategory())
        }
    },[dispatch, postcategories])

    return (
        <>
            <h1 className="text-center">Add Post</h1>
            { isError && <h1 className="text-center">{errorMessage}</h1> }
            <form onSubmit={addPostSubmit} className="mb-5">
                <div className="row mx-2 my-5">
                    <div className="col-9">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" onChange={(event) => { setTitle(event.target.value) }}/>
                        </div>
                        <div className="form-group">
                            <label>detail</label>
                            <textarea className="form-control" onChange={(event) => { setDetail(event.target.value) }} />
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
                    </div>
                    <div className="col-3">
                        <div className="row">
                            <div className="col-12 card p-0 mb-2">
                                <div className="card-header">
                                    Field 1
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label>image</label>
                                        { !image &&
                                        <input type="file" className="form-control-file" onChange={onImageChange}/>
                                    }
                                        { image &&
                                        <>
                                            <div className="img-wrap mr-2">
                                                <img src={image} width="80px" alt='error'/>
                                                <button className="delete-img" onClick={(event) => onDeleteImage(event, image)}>x</button>
                                            </div>
                                        </>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>images</label>
                                        <input type="file" className="form-control-file" onChange={onImagesChange}/>
                                        { recentImages.length > 0 && 
                                            recentImages.map((image, index) => {
                                            return <React.Fragment key={index}>
                                                <div className="img-wrap mr-2">
                                                    <img src={image} width="80px" alt='error'/>
                                                    <button className="delete-img" onClick={(event) => onDeleteImages(event, image)}>x</button>
                                                </div>
                                            </React.Fragment>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 card p-0 mb-2">
                                <div className="card-header">
                                    Field 2
                                </div>
                                <div className="card-body">
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
                                        { !postcategories.length && 
                                            <>
                                                <h1>Cannot fetching data please refresh</h1>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center m-2">
                    <button type="submit" className="btn btn-primary mx-1">Submit</button>
                    <Link className="btn btn-primary mx-1" to="/admin/posts"> Back</Link>
                </div>
            </form>
        </>
    )
}