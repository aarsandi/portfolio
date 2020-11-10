import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { editProject, fetchOneProject } from '../../../store/actions/admin'

export default function EditProject() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()

    const project = useSelector((state) => state.adminReducer.project)
    const isLoading = useSelector((state) => state.adminReducer.isLoading)
    const isError = useSelector((state) => state.adminReducer.isError)

    const [title, setTitle] = useState('')
    const [detail, setDetail] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [images, setImages] = useState('')
    const [gitlink, setGitlink] = useState('')
    const [demolink, setDemolink] = useState('')
    const [featured, setFeatured] = useState(true)
    const [isdone, setIsDOne] = useState(true)
    const [ProjectCategories, setProjectCategories] = useState([1,2])
    
    function editProjectSubmit(event) {
        event.preventDefault()
        dispatch(editProject(id, { title, detail, content, image, images, gitlink, demolink, featured, isdone, ProjectCategories }))
        history.push('/admin/projects')
    }

    useEffect(() => {
        dispatch(fetchOneProject(id))
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
                <h1 className="text-center">Edit Project</h1>
                <form onSubmit={editProjectSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" placeholder={project.title} onChange={(event) => { setTitle(event.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label>detail</label>
                        <input type="text" className="form-control" placeholder={project.detail} onChange={(event) => { setDetail(event.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label>content</label>
                        <input type="text" className="form-control" placeholder={project.content} onChange={(event) => { setContent(event.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label>image</label>
                        <input type="text" className="form-control" placeholder={project.image} onChange={(event) => { setImage(event.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label>images</label>
                        <input type="text" className="form-control" placeholder={project.images} onChange={(event) => { setImages(event.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label>git link</label>
                        <input type="text" className="form-control" placeholder={project.gitlink} onChange={(event) => { setGitlink(event.target.value) }}/>
                    </div>
                    <div className="form-group">
                        <label>demo link</label>
                        <input type="text" className="form-control" placeholder={project.demolink} onChange={(event) => { setDemolink(event.target.value) }}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link className="nav-link" to="/admin"> Home</Link>
                </form>
            </>
        )
    }
}