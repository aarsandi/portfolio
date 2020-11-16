import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import timeSince from '../../../helpers/timeFormat'

import { fetchAllProjectCategory, deleteProjectCategory } from '../../../store/actions/admin'

export default function ProjectCategoryTable() {
    const dispatch = useDispatch()
    const [isOnlyOne, setIsOnlyOne] = useState(false)

    const projectCategories = useSelector((state) => state.adminReducer.projectcategories)
    const isLoading = useSelector((state) => state.adminReducer.isLoading)
    const isError = useSelector((state) => state.adminReducer.isError)
    const errorMessage = useSelector((state) => state.adminReducer.errorMessage)

    function deleteProjectCategoryClick(event, id) {
        event.preventDefault()
        if (projectCategories.length > 1) {
            dispatch(deleteProjectCategory(id))
            setIsOnlyOne(false)
        } else {
            setIsOnlyOne(true)
        }
    }

    useEffect(() => {
        if (projectCategories.length === 0) {
            dispatch(fetchAllProjectCategory())
        }
    },[dispatch, projectCategories])

    return (
        <>
            <h1 className="text-center">Browse Post Categories</h1>
            { isError && <h1 className="text-center">{errorMessage}</h1> }
            <Link to="/admin/catproject/add"> Add New</Link>
            { isLoading && <h1 className="text-center">Loading.......</h1> }
            { projectCategories.length > 0 &&
            <>
                { isOnlyOne &&
                    <div className="alert alert-warning show" role="alert">
                        data just only one left, cant delete it
                        <button type="button" className="close" onClick={() => { setIsOnlyOne(false) }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Updated at</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    { projectCategories.map((projectcategory) => {
                        return <React.Fragment key={projectcategory.id}>
                            <tr>
                                <th scope="row">{projectcategory.id}</th>
                                <td>{projectcategory.title}</td>
                                <td>{timeSince(projectcategory.updatedAt)}</td>
                                <td>
                                    <Link className="btn btn-primary mx-1" to={'/admin/catproject/edit/'+ projectcategory.id}> Edit</Link>
                                    <button className="btn btn-primary mx-1" onClick={(event) => deleteProjectCategoryClick(event, projectcategory.id)}> Delete</button>
                                </td>
                            </tr>
                        </React.Fragment>
                    })}
                    </tbody>
                </table>
            </>
            }
        </>
    )
}