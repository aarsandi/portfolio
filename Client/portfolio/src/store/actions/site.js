import axios from '../../api/axios'

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

// Loading and Error
export function setLoading() {
    return { type: 'SITE_SET_LOADING'}
}

export function setError(error) {
    return { type: 'SITE_SET_ERROR', payload: error }
}

// Home
export function fetchHomeData() {
    return async function (dispatch) {
        try {
            dispatch(setLoading())
            const response = await axios({
                method: 'get',
                url: '/'
            })
            dispatch(siteHomeData(response.data))
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}

// project actions
export function fetchAllProjects() {
    return async function (dispatch) {
        try {
            dispatch(setLoading())
            const response = await axios({
                method: 'get',
                url: '/project'
            })
            dispatch(siteAllProjects(response.data))
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}

export function fetchOneProject(id) {
    return async function (dispatch) {
        try {
            dispatch(setLoading())
            const response = await axios({
                method: 'get',
                url: '/project/'+id
            })
            dispatch(siteOneProject(response.data))
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}