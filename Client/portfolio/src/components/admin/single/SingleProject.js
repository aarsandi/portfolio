import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { fetchOneProject } from '../../../store/actions/admin'

export default function SingleProject() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const project = useSelector((state) => state.adminReducer.project)
    const isLoading = useSelector((state) => state.adminReducer.isLoading)
    const isError = useSelector((state) => state.adminReducer.isError)

    useEffect(() => {
        dispatch(fetchOneProject(id))
    },[dispatch, id])

    if (isLoading) {
        return <h1>loading......</h1>
    } else if (isError) {
        return (
        <>
            <h1>Well, this is awkward</h1>
            <Link to="/admin" className="btn btn-primary">Home</Link>
        </>
        )
    } else {
        return (
            <>
                <h1 className="text-center">Single Project</h1>
                <h1 className="text-center">id: {project.id}</h1>
                <h1 className="text-center">title: {project.title}</h1>
                <h1 className="text-center">detail: {project.detail}</h1>
                <h1 className="text-center">article: {project.content}</h1>
                <h1 className="text-center">image: {project.image}</h1>
                <h1 className="text-center">images: {project.images}</h1>
                <h1 className="text-center">git link: {project.gitlink}</h1>
                <h1 className="text-center">demo link: {project.demolink}</h1>
                <h1 className="text-center">featured: {project.featured ? 'true' : 'false'}</h1>
                <h1 className="text-center">featured: {project.isdone ? 'true' : 'false'}</h1>
                <h1 className="text-center">created at: {project.createdAt}</h1>
                <h1 className="text-center">updated at: {project.updatedAt}</h1>
            </>
        )
    }
}