import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Multiselect } from 'multiselect-react-dropdown'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { addProject, fetchAllProjectCategory } from '../../../store/actions/admin'

export default function AddProject() {
    const history = useHistory()
    const dispatch = useDispatch()
    const isError = useSelector((state) => state.adminReducer.isError)
    const projectcategories = useSelector((state) => state.adminReducer.projectcategories)
    const errorMessage = useSelector((state) => state.adminReducer.errorMessage)
    
    const [title, setTitle] = useState('')
    const [detail, setDetail] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [images, setImages] = useState('')
    const [gitlink, setGitlink] = useState('')
    const [demolink, setDemolink] = useState('')
    const [featured, setFeatured] = useState(String(0))
    const [isdone, setIsDone] = useState(String(0))
    const [recentProjectCategories, setRecentProjectCategories] = useState([])

    function addProjectSubmit(event) {
        event.preventDefault()
        let ProjectCategories = []
        if (recentProjectCategories.length > 0) {
            recentProjectCategories.forEach(data => {
                ProjectCategories.push(data.id)
            })
        }
        dispatch(addProject({ title, detail, content, image, images, gitlink, demolink, featured, isdone, ProjectCategories }))
        history.push('/admin/projects')
    }

    useEffect(() => {
        if (projectcategories.length === 0) {
            dispatch(fetchAllProjectCategory())
        }
    },[dispatch, projectcategories])

    return (
        <>
            <h1 className="text-center">Add Project</h1>
            <form onSubmit={addProjectSubmit} className="mb-5">
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
                    <label>git link</label>
                    <input type="text" className="form-control" onChange={(event) => { setGitlink(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>demo link</label>
                    <input type="text" className="form-control" onChange={(event) => { setDemolink(event.target.value) }}/>
                </div>
                <div class="form-group">
                    <label>Featured</label>
                    <select class="form-control" value={featured} onChange={(event) => { setFeatured(Number(event.target.value)) }}>
                        <option value="1">yes</option>
                        <option value="0">no</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Is Done</label>
                    <select class="form-control" value={isdone} onChange={(event) => { setIsDone(Number(event.target.value)) }}>
                        <option value="1">yes</option>
                        <option value="0">no</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Project Category</label>
                    { projectcategories.length > 0 && 
                        <Multiselect options={projectcategories}
                            onRemove={(selectedList) => {
                                setRecentProjectCategories(selectedList)
                            }}
                            onSelect={(selectedList) => {
                                setRecentProjectCategories(selectedList)
                            }}
                            displayValue="title"
                        />
                    }
                    { isError && 
                        <>
                            <h1>Cannot fetching data category please refresh</h1>
                            <h1>{errorMessage.error}</h1>
                        </>
                    }
                </div>
                <button type="submit" className="btn btn-primary mx-1">Submit</button>
                <Link className="btn btn-primary mx-1" to="/admin/projects"> Back</Link>
            </form>
        </>
    )
}