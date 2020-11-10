import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { addProject } from '../../../store/actions/admin'

export default function AddProject() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [detail, setDetail] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [images, setImages] = useState('')
    const [gitlink, setGitlink] = useState('')
    const [demolink, setDemolink] = useState('')
    const [featured, setFeatured] = useState(false)
    const [isdone, setIsDOne] = useState(true)
    const [ProjectCategories, setProjectCategories] = useState([1,2])

    function addProjectSubmit(event) {
        event.preventDefault()
        dispatch(addProject({ title, detail, content, image, images, gitlink, demolink, featured, isdone, ProjectCategories }))
        history.push('/admin/projects')
    }
    return (
        <>
            <h1 className="text-center">Add Project</h1>
            <form onSubmit={addProjectSubmit}>
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
                <div className="form-group">
                    <label>git link</label>
                    <input type="text" className="form-control" onChange={(event) => { setGitlink(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>demo link</label>
                    <input type="text" className="form-control" onChange={(event) => { setDemolink(event.target.value) }}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="nav-link" to="/admin"> Home</Link>
            </form>
        </>
    )
}