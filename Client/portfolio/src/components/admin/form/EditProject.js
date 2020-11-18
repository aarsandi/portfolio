import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { editProject } from '../../../store/actions/admin'
import { Multiselect } from 'multiselect-react-dropdown';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { app } from '../../../base'

export default function EditProject() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()

    const projects = useSelector((state) => state.adminReducer.projects)
    const projectcategories = useSelector((state) => state.adminReducer.projectcategories)
    const project = projects.find(project => project.id === Number(id))

    const [title, setTitle] = useState(project ? project.title : '')
    const [detail, setDetail] = useState(project ? project.detail : '')
    const [content, setContent] = useState(project ? project.content : '')
    const [image, setImage] = useState(project ? project.image : '')
    const [recentImages, setRecentImages] = useState(project ? project.images.length > 0 ? JSON.parse(project.images) : [] : [])
    const [gitlink, setGitlink] = useState(project ? project.gitlink : '')
    const [demolink, setDemolink] = useState(project ? project.demolink : '')
    const [featured, setFeatured] = useState(project ? String(project.featured) : false)
    const [isdone, setIsDone] = useState(project ? String(project.isdone) : false)
    const [recentProjectCategories, setRecentProjectCategories] = useState([])
    
    function editProjectSubmit(event) {
        event.preventDefault()
        let ProjectCategories = []
        if (recentProjectCategories.length > 0) {
            recentProjectCategories.forEach(data => {
                ProjectCategories.push(data.id)
            })
        }
        let images = JSON.stringify(recentImages)
        dispatch(editProject(id, { title, detail, content, image, images, gitlink, demolink, featured, isdone, ProjectCategories }))
        history.push('/admin/projects')
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
        const fileRef = storageRef.child(`projects/${date}/${filename.name}`)
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
        if (projectcategories.length === 0 || projects.length === 0) {
            history.push('/admin/projects')
        }
    },[projects, history, projectcategories])

return (
    <>
        <h1 className="text-center">Edit Project</h1>
        <form onSubmit={editProjectSubmit} className="mb-5">
            <div className="row mx-2 my-5">
                <div className="col-9">
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" value={title} onChange={(event) => { setTitle(event.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label>detail</label>
                        <textarea className="form-control" value={detail} onChange={(event) => { setDetail(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>git link</label>
                        <input type="text" className="form-control" value={gitlink} onChange={(event) => { setGitlink(event.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label>demo link</label>
                        <input type="text" className="form-control" value={demolink} onChange={(event) => { setDemolink(event.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label>content</label>
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
                                            <img src={image} width="100%" alt='error'/>
                                            <button className="delete-img" onClick={(event) => onDeleteImage(event, image)}>x</button>
                                        </div>
                                    </>
                                    }
                                </div>
                                <div className="form-group">
                                    <label>images</label>
                                    <input className="form-control-file" type="file" onChange={onImagesChange}/>
                                    { recentImages.length > 0 && 
                                        recentImages.map((image, index) => {
                                        return <React.Fragment key={index}>
                                            <div className="img-wrap mr-2">
                                                <img src={image} width="47%" alt='error'/>
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
                                    <label>Is Done</label>
                                    <select className="form-control" value={isdone} onChange={(event) => { setIsDone(Number(event.target.value)) }}>
                                        <option value="1">yes</option>
                                        <option value="0">no</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Project Categories</label>
                                    <Multiselect 
                                        options={projectcategories}
                                        selectedValues={project ? project.ProjectCategories : []}
                                        onRemove={(selectedList) => {
                                            setRecentProjectCategories(selectedList)
                                        }}
                                        onSelect={(selectedList) => {
                                            setRecentProjectCategories(selectedList)
                                        }}
                                        displayValue="title"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-center m-2">
                <button type="submit" className="btn btn-primary mx-1">Submit</button>
                <Link className="btn btn-primary mx-1" to="/admin/projects"> Back</Link>
            </div>
        </form>
    </>
    )
}