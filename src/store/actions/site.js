import dataProjects from '../../json/projects.json'
import dataSkills from '../../json/skills.json'

// HOME
export function siteHomeData(data) {
    return { type: 'SITEHOMEDATA', payload: data }
}

// PROJECT
export function siteAllProjects(projects) {
    return { type: 'SITEALLPROJECTS', payload: projects }
}

export function siteOneProject(project) {
    return { type: 'SITEONEPROJECT', payload: project }
}

// Home
export function fetchHomeData(dispatch, cb) {
    if(dataProjects&&dataSkills) {
        const projects = dataProjects.filter(el => el.featured)
        const skills = dataSkills
        dispatch(siteHomeData({projects,skills}))
        cb&&cb('success')
    }else{
        cb&&cb('error')
    }
}

// project actions
export function fetchAllProjects() {
    return async function (dispatch) {
        try {
            console.log(dataProjects)
        } catch (err) {
            console.log(err)
        }
    }
}

export function fetchOneProject(id) {
    return async function (dispatch) {
        try {
            console.log(dataProjects)
        } catch (err) {
            console.log(err)
        }
    }
}