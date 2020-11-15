import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { editPostCategory } from '../../../store/actions/admin'

export default function EditPostCategory() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()

    const postcategories = useSelector((state) => state.adminReducer.postcategories)
    const postcategory = postcategories.find(postcategory => postcategory.id == id)
    const isError = useSelector((state) => state.adminReducer.isError)

    const [title, setTitle] = useState(postcategory ? postcategory.title : '')
    
    function editPostCategorySubmit(event) {
        event.preventDefault()
        dispatch(editPostCategory(postcategory.id, { title }))
        history.push('/admin/postcategories')
    }

    useEffect(() => {
        if (isError || postcategories.length === 0) {
            history.push('/admin/postcategories')
        }
    },[postcategories, isError, history])

    return (
        <>
            <h1 className="text-center">Edit Post Category</h1>
            <form onSubmit={editPostCategorySubmit} className="mb-5">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={(event) => { setTitle(event.target.value) }}/>
                </div>
                <button type="submit" className="btn btn-primary mx-1">Submit</button>
                <Link className="btn btn-primary mx-1" to="/admin/postcategories"> Back</Link>
            </form>
        </>
    )
}