import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchAllProjects, deleteProject } from '../../../store/actions/admin'

export default function ProjectTable() {
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.adminReducer.projects)
    const isLoading = useSelector((state) => state.adminReducer.isLoading)
    const isError = useSelector((state) => state.adminReducer.isError)
    const errorMessage = useSelector((state) => state.adminReducer.errorMessage)

    function deleteProjectClick(event, id) {
        event.preventDefault()
        dispatch(deleteProject(id))
    }

    useEffect(() => {
        dispatch(fetchAllProjects())
    },[dispatch])

    if (isError) {
        return (
        <>
            <h1>Well, this is awkward</h1>
            <h1>{errorMessage.error}</h1>
            <Link to="/" className="btn btn-primary">Home</Link>
        </>
        )
    } else if (isLoading) {
        return <h1>loading......</h1>
    } else {
        return (
        <>
            <h1 className="text-center">Browse Projects</h1>
            <Link to="/admin/project/add"> Add</Link>
            <select className="float-right">
                <option value="" defaultValue disabled hidden>Sort by</option>
                <option>ascending</option>
                <option>descending</option>
            </select>
            <input className="float-right" type="text" placeholder="Search.."/>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Detail</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { projects.map((project) => {
                        return <React.Fragment key={project.id}>
                            <tr>
                                <th scope="row">{project.id}</th>
                                <td>{project.title}</td>
                                <td>{project.detail}</td>
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