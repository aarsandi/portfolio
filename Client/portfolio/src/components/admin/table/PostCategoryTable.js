import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import timeSince from '../../../helpers/timeFormat'

import { fetchAllPostCategory, deletePostCategory } from '../../../store/actions/admin'
import GridLoader from "react-spinners/GridLoader";

export default function PostCategoryTable() {
    const dispatch = useDispatch()
    const [isOnlyOne, setIsOnlyOne] = useState(false)

    const postCategories = useSelector((state) => state.adminReducer.postcategories)
    const isLoading = useSelector((state) => state.adminReducer.isLoading)
    const isError = useSelector((state) => state.adminReducer.isError)
    const errorMessage = useSelector((state) => state.adminReducer.errorMessage)

    function deletePostCategoryClick(event, id) {
        event.preventDefault()
        if (postCategories.length > 1) {
            dispatch(deletePostCategory(id))
            setIsOnlyOne(false)
        } else {
            setIsOnlyOne(true)
        }
    }

    useEffect(() => {
        if (postCategories.length === 0) {
            dispatch(fetchAllPostCategory())
        }
    },[dispatch, postCategories])

    if (isLoading) {
        return (
            <>
            <div className="d-flex align-items-center justify-content-center m-5">
                <GridLoader
                    size={30}
                    color={"black"}
                    loading={isLoading}
                />
            </div>
            </>
        )
    } else if (isError) {
        return (
            <>
                <div className="d-flex align-items-center justify-content-center m-5">
                    <h1 className="text-center">Oooops. this is awkward</h1>
                    <h1 className="text-center">{errorMessage}</h1>
                </div>
            </>
        )
    } else {
        return (
            <>
                <h1 className="text-center">Browse Blog Categories</h1>
                { isOnlyOne &&
                    <div className="alert alert-warning show" role="alert">
                        data just only one left, cant delete it
                        <button type="button" className="close" onClick={() => { setIsOnlyOne(false) }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                <Link to="/admin/catpost/add"> Add New</Link>
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
                    { postCategories.map((postcategory) => {
                        return <React.Fragment key={postcategory.id}>
                            <tr>
                                <th scope="row">{postcategory.id}</th>
                                <td>{postcategory.title}</td>
                                <td>{timeSince(postcategory.updatedAt)}</td>
                                <td>
                                    <Link className="btn btn-primary mx-1" to={'/admin/catpost/edit/'+ postcategory.id}> Edit</Link>
                                    <button className="btn btn-primary mx-1" onClick={(event) => deletePostCategoryClick(event, postcategory.id)}> Delete</button>
                                </td>
                            </tr>
                        </React.Fragment>
                    })}
                    </tbody>
                </table>
            </>
        )
    }
}