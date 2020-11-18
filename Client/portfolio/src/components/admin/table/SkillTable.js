import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import timeSince from '../../../helpers/timeFormat'

import { fetchAllSkills } from '../../../store/actions/admin'
import GridLoader from "react-spinners/GridLoader";

export default function SkillTable() {
    const dispatch = useDispatch()
    const skills = useSelector((state) => state.adminReducer.skills)
    const isLoading = useSelector((state) => state.adminReducer.isLoading)
    const isError = useSelector((state) => state.adminReducer.isError)
    const errorMessage = useSelector((state) => state.adminReducer.errorMessage)

    useEffect(() => {
        if (skills.length === 0) {
            dispatch(fetchAllSkills())
        }
    },[dispatch, skills])

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
                <h1 className="text-center">Browse Skills</h1>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Order</th>
                        <th scope="col">Title</th>
                        <th scope="col">Icon</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    { skills.map((skill) => {
                        return <React.Fragment key={skill.id}>
                            <tr>
                                <th scope="row">{skill.order}</th>
                                <td>{skill.title}</td>
                                <td>{skill.icon}</td>
                                <td>{timeSince(skill.updatedAt)}</td>
                                <td>
                                    <Link className="btn btn-primary mx-1" to={'/admin/skill/edit/'+ skill.id}> Edit</Link>
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