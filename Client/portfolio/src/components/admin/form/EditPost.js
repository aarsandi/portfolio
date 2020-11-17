import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { editPost } from '../../../store/actions/admin'
import { Multiselect } from 'multiselect-react-dropdown';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { app } from '../../../base'

export default function EditPost() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()

    const posts = useSelector((state) => state.adminReducer.posts)
    const postcategories = useSelector((state) => state.adminReducer.postcategories)
    const post = posts.find(post => post.id === Number(id))

    const [title, setTitle] = useState(post ? post.title : '')
    const [detail, setDetail] = useState(post ? post.detail : '')
    const [content, setContent] = useState(post ? post.content : '')
    const [image, setImage] = useState(post ? post.image : '')
    const [recentImages, setRecentImages] = useState(post ? post.images.length > 0 ? JSON.parse(post.images) : [] : [])
    const [featured, setFeatured] = useState(post ? String(post.featured) : false)
    const [recentPostCategories, setRecentPostCategories] = useState([])
    
    function editPostSubmit(event) {
        event.preventDefault()
        let PostCategories = []
        if (recentPostCategories.length > 0) {
            recentPostCategories.forEach(data => {
                PostCategories.push(data.id)
            })
        }
        let images = JSON.stringify(recentImages)
        dispatch(editPost(id, { title, detail, content, image, images, featured, PostCategories }))
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
        if (postcategories.length === 0 || posts.length === 0) {
            history.push('/admin/posts')
        }
    },[postcategories, posts, history])

    return (
        <>
            <h1 className="text-center">Edit Post</h1>
            <form onSubmit={editPostSubmit} className="mb-5">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={(event) => { setTitle(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>detail</label>
                    <input type="text" className="form-control" value={detail} onChange={(event) => { setDetail(event.target.value) }}/>
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
                    <input type="file" className="form-control-file" onChange={onImageChange}/>
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
                <div className="form-group">
                    <label>Featured</label>
                    <select className="form-control" value={featured} onChange={(event) => { setFeatured(Number(event.target.value)) }}>
                        <option value="1">yes</option>
                        <option value="0">no</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Post Categories</label>
                    <Multiselect 
                        options={postcategories}
                        selectedValues={post ? post.PostCategories : []}
                        onRemove={(selectedList) => {
                            setRecentPostCategories(selectedList)
                        }} 
                        onSelect={(selectedList) => {
                            setRecentPostCategories(selectedList)
                        }} 
                        displayValue="title"
                    />
                </div>
                <button type="submit" className="btn btn-primary mx-1">Submit</button>
                <Link className="btn btn-primary mx-1" to="/admin/posts"> Back</Link>
            </form>
        </>
    )
}