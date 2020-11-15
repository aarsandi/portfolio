import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { addProjectCategory } from '../../../store/actions/admin'

export default function AddProjectCategory() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    
    function addProjectCategorySubmit(event) {
        event.preventDefault()
        dispatch(addProjectCategory({ title }))
        history.push('/admin/projectcategories')
    }

    return (
        <>
            <h1 className="text-center">Add Post Category</h1>
            <form onSubmit={addProjectCategorySubmit} className="mb-5">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" onChange={(event) => { setTitle(event.target.value) }}/>
                </div>
                <button type="submit" className="btn btn-primary mx-1">Submit</button>
                <Link className="btn btn-primary mx-1" to="/admin/projectcategories"> Back</Link>
            </form>
        </>
    )
}