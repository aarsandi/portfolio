import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { editProjectCategory } from '../../../store/actions/admin'

export default function EditProjectCategory() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()

    const projectcategories = useSelector((state) => state.adminReducer.projectcategories)
    const isError = useSelector((state) => state.adminReducer.isError)
    const projectcategory = projectcategories.find(projectcategory => projectcategory.id == id)

    const [title, setTitle] = useState(projectcategory ? projectcategory.title : '')
    
    function editProjectCategorySubmit(event) {
        event.preventDefault()
        dispatch(editProjectCategory(id, { title }))
        history.push('/admin/projectcategories')
    }

    useEffect(() => {
        if (isError || projectcategories.length === 0) {
            history.push('/admin/projectcategories')
        }
    },[projectcategories, isError, history])

    return (
        <>
            <h1 className="text-center">Edit Project Category</h1>
            <form onSubmit={editProjectCategorySubmit} className="mb-5">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={(event) => { setTitle(event.target.value) }}/>
                </div>
                <button type="submit" className="btn btn-primary mx-1">Submit</button>
                <Link className="btn btn-primary mx-1" to="/admin/projectcategories"> Back</Link>
            </form>
        </>
    )
}