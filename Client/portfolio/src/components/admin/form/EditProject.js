import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { editProject } from '../../../store/actions/admin'
import { Multiselect } from 'multiselect-react-dropdown';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

export default function EditProject() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()

    const projects = useSelector((state) => state.adminReducer.projects)
    const projectcategories = useSelector((state) => state.adminReducer.projectcategories)
    const project = projects.find(project => project.id == id)

    const [title, setTitle] = useState(project ? project.title : '')
    const [detail, setDetail] = useState(project ? project.detail : '')
    const [content, setContent] = useState(project ? project.content : '')
    const [image, setImage] = useState(project ? project.image : '')
    const [images, setImages] = useState(project ? project.images : '')
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
        dispatch(editProject(id, { title, detail, content, image, images, gitlink, demolink, featured, isdone, ProjectCategories }))
        history.push('/admin/projects')
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
            <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" value={title} onChange={(event) => { setTitle(event.target.value) }}/>
            </div>
            <div className="form-group">
                <label>detail</label>
                <input type="text" className="form-control" value={detail} onChange={(event) => { setDetail(event.target.value) }}/>
            </div>
            <div className="form-group">
                <label>content</label>
                {/* <input type="text" className="form-control" value={content} onChange={(event) => { setContent(event.target.value) }}/> */}
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
                <input type="text" className="form-control" value={image} onChange={(event) => { setImage(event.target.value) }}/>
            </div>
            <div className="form-group">
                <label>images</label>
                <input type="text" className="form-control" value={images} onChange={(event) => { setImages(event.target.value) }}/>
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
            <button type="submit" className="btn btn-primary mx-1">Submit</button>
            <Link className="btn btn-primary mx-1" to="/admin/projects"> Back</Link>
        </form>
    </>
    )
}