import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import timeSince from '../../../helpers/timeFormat'

import { fetchAllProjects, deleteProject, fetchAllProjectCategory } from '../../../store/actions/admin'

export default function ProjectTable() {
    const dispatch = useDispatch()
    const [isOnlyOne, setIsOnlyOne] = useState(false)

    const projects = useSelector((state) => state.adminReducer.projects)
    const projectcategories = useSelector((state) => state.adminReducer.projectcategories)
    const isLoading = useSelector((state) => state.adminReducer.isLoading)
    const isError = useSelector((state) => state.adminReducer.isError)
    const errorMessage = useSelector((state) => state.adminReducer.errorMessage)

    function deleteProjectClick(event, id) {
        event.preventDefault()
        if (projects.length > 1) {
            dispatch(deleteProject(id))
            setIsOnlyOne(false)
        } else {
            setIsOnlyOne(true)
        }
    }

    useEffect(() => {
        if (projects.length === 0 || projectcategories.length === 0) {
            dispatch(fetchAllProjects())
            dispatch(fetchAllProjectCategory())
        }
    },[dispatch, projects, projectcategories])

    if (isError) {
        return (
        <>
            <h1>Well, this is awkward</h1>
            <h1>{errorMessage.error}</h1>
            <Link to="/admin" className="btn btn-primary">back to home or try refresh</Link>
        </>
        )
    } else if (isLoading) {
        return <h1>loading......</h1>
    } else {
        return (
        <>
            <h1 className="text-center">Browse Projects</h1>
            <Link to="/admin/project/add"> Add New</Link>
            { isOnlyOne &&
                <div className="alert alert-warning show" role="alert">
                    data just only one left, cant delete it
                    <button type="button" className="close" onClick={() => { setIsOnlyOne(false) }}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            }
            {/* <select className="float-right">
                <option value="" defaultValue disabled hidden>Sort by</option>
                <option>ascending</option>
                <option>descending</option>
            </select>
            <input className="float-right" type="text" placeholder="Search.."/> */}
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Featured</th>
                    <th scope="col">Is Done</th>
                    <th scope="col">Detail</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { projects.map((project) => {
                        return <React.Fragment key={project.id}>
                            <tr>
                                <th scope="row">{project.title}</th>
                                <td>{project.featured ? 'yes' : 'no'}</td>
                                <td>{project.isdone ? 'yes' : 'no'}</td>
                                <td>{project.detail}</td>
                                <td>{timeSince(projects.updatedAt)}</td>
                                <td>
                                    <Link className="btn btn-primary mx-1" to={'/admin/project/read/'+ project.id}> Read</Link>
                                    <Link className="btn btn-primary mx-1" to={'/admin/project/edit/'+ project.id}> Edit</Link>
                                    <button className="btn btn-primary mx-1" onClick={(event) => deleteProjectClick(event, project.id)}> Delete</button>
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