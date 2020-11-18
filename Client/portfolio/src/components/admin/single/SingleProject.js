import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import timeSince from '../../../helpers/timeFormat'

import { fetchOneProject } from '../../../store/actions/admin'
import GridLoader from "react-spinners/GridLoader";

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
        return (
            <div className="d-flex align-items-center justify-content-center m-5">
                <GridLoader
                    size={30}
                    color={"black"}
                    loading={isLoading}
                />
            </div>
        )
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
            <div className="row mx-2 my-5">
                <div className="col-9">
                    <h1>Title :</h1>
                    <h3>{project.title}</h3>
                    <h1>Detail :</h1>
                    <h3>{project.detail}</h3>
                    <h1>Content :</h1>
                    <div dangerouslySetInnerHTML={{__html: project.content}} />
                </div>
                <div className="col-3">
                    <div className="row">
                        <div className="col-12 card p-0 mb-2">
                            <div className="card-header">
                                Field
                            </div>
                            <div className="card-body">
                                <h4>id: {project.id}</h4>
                                <h4>featured: <span className="badge badge-primary">{project.featured ? 'true' : 'false'}</span></h4>
                                <h4>Is Done: <span className="badge badge-primary">{project.isdone ? 'true' : 'false'}</span></h4>
                                <h4>Git Link: </h4>
                                <a href={project.gitlink} target="_blank" rel="noopener noreferrer"><h4>{project.gitlink}</h4></a>
                                <h4>Demo Link: </h4>
                                <a href={project.demolink} target="_blank" rel="noopener noreferrer"><h4>{project.demolink}</h4></a>
                                <h4>created at: {timeSince(project.createdAt)}</h4>
                                <h4>updated at: {timeSince(project.updatedAt)}</h4>
                            </div>
                        </div>
                        <div className="col-12 card p-0 mb-2">
                            <div className="card-header">
                                Image
                            </div>
                            <div className="card-body">
                                <h4>image : </h4><img src={project.image} alt="img" width="100%"/>
                            </div>
                        </div>
                        <div className="col-12 card p-0">
                            <div className="card-header">
                                Images
                            </div>
                            <div className="card-body">
                                <h4>images : <span className="badge badge-primary">{project.images ? JSON.parse(project.images).length + ' items' : '0 items'}</span></h4>
                                { project.images &&
                                    JSON.parse(project.images).map((image, index) => {
                                    return <React.Fragment key={index}>
                                        <img className="mb-1" src={image} alt="img" width="100%"/>
                                    </React.Fragment>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}