import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { editSkill } from '../../../store/actions/admin'

export default function EditSkill() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()

    const skills = useSelector((state) => state.adminReducer.skills)
    const skill = skills.find(skill => skill.id === Number(id))
    const isError = useSelector((state) => state.adminReducer.isError)

    const [title, setTitle] = useState(skill ? skill.title : '')
    const [icon, setIcon] = useState(skill ? skill.icon : '')
    const [order, setOrder] = useState(skill ? skill.order : '')
    const [detail, setDetail] = useState(skill ? skill.detail : '')
    
    function editSkillSubmit(event) {
        event.preventDefault()
        dispatch(editSkill(id, { title, icon, order, detail }))
        history.push('/admin/skills')
    }

    useEffect(() => {
        if (isError || skills.length === 0) {
            history.push('/admin/skills')
        }
    },[history, skills, isError])

    return (
    <>
        <h1 className="text-center">Edit Skill</h1>
            <form onSubmit={editSkillSubmit} className="mb-5">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={(event) => { setTitle(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Icon</label>
                    <input type="text" className="form-control" value={icon} onChange={(event) => { setIcon(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Order</label>
                    <input type="number" className="form-control" value={order} onChange={(event) => { setOrder(event.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Detail</label>
                    <input type="text" className="form-control" value={detail} onChange={(event) => { setDetail(event.target.value) }}/>
                </div>
                <button type="submit" className="btn btn-primary mx-1">Submit</button>
                <Link className="btn btn-primary mx-1" to="/admin/skills"> Back</Link>
            </form>
    </>
    )
}