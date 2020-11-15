import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { addPostCategory } from '../../../store/actions/admin'

export default function AddPostCategory() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    
    function addPostCategorySubmit(event) {
        event.preventDefault()
        dispatch(addPostCategory({ title }))
        history.push('/admin/postcategories')
    }

    return (
        <>
            <h1 className="text-center">Add Post Category</h1>
            <form onSubmit={addPostCategorySubmit} className="mb-5">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" onChange={(event) => { setTitle(event.target.value) }}/>
                </div>
                <button type="submit" className="btn btn-primary mx-1">Submit</button>
                <Link className="btn btn-primary mx-1" to="/admin/postcategories"> Back</Link>
            </form>
        </>
    )
}