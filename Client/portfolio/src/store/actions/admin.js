import axios from '../../api/axios'

// POST
export function setAllPosts(posts) {
    return { type: 'SETALLPOSTS', payload: posts }
}

export function setOnePost(post) {
    return { type: 'SETONEPOST', payload: post }
}

export function saveAddPost(post) {
    return { type: 'ADDPOST', payload: post }
}

export function saveEditPost(post) {
    return { type: 'EDITPOST', payload: post }
}

export function saveDeletePost(id) {
    return { type: 'DELETEPOST', payload: id }
}

// PROJECT
export function setAllProjects(projects) {
    return { type: 'SETALLPROJECTS', payload: projects }
}

export function setOneProject(project) {
    return { type: 'SETONEPROJECT', payload: project }
}

export function saveAddProject(project) {
    return { type: 'ADDPROJECT', payload: project }
}

export function saveEditProject(project) {
    return { type: 'EDITPROJECT', payload: project }
}

export function saveDeleteProject(id) {
    return { type: 'DELETEPROJECT', payload: id }
}

// Loading and Error
export function setLoading() {
    return { type: 'SET_LOADING'}
}

export function setError(error) {
    return { type: 'SET_ERROR', payload: error }
}

// Post Actions
export function fetchAllPosts() {
    return async function (dispatch) {
        try {
            dispatch(setLoading())
            const response = await axios({
                method: 'get',
                url: '/admin/posts',
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
            dispatch(setAllPosts(response.data))
        } catch (err) {
            if (err.response.data) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}

export function fetchOnePost(id) {
    return async function (dispatch) {
        try {
            dispatch(setLoading())
            const response = await axios({
                method: 'get',
                url: '/admin/post/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
            dispatch(setOnePost(response.data))
        } catch (err) {
            if (err.response.data) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}

export function addPost(data) {
    return async function (dispatch) {
        try {
            const response = await axios({
                method: 'post',
                url: '/admin/post/add',
                headers: {
                    token: localStorage.getItem('access_token')
                },
                data: data
            })
            dispatch(saveAddPost(response.data))
        } catch (err) {
            if (err.response.data) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}

export function editPost(id, data) {
    return async function (dispatch) {
        try {
            const response = await axios({
                method: 'put',
                url: '/admin/post/edit/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                },
                data: data
            })
            dispatch(saveEditPost(response.data))
        } catch (err) {
            if (err.response.data) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}

export function deletePost(id) {
    return async function (dispatch) {
        try {
            await axios({
                method: 'delete',
                url: '/admin/post/delete/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
            dispatch(saveDeletePost(id))
        } catch (err) {
            if (err.response.data) {
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
                url: '/admin/projects',
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
            dispatch(setAllProjects(response.data))
        } catch (err) {
            if (err.response.data) {
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
                url: '/admin/project/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
            dispatch(setOneProject(response.data))
        } catch (err) {
            if (err.response.data) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}

export function addProject(data) {
    return async function (dispatch) {
        try {
            const response = await axios({
                method: 'post',
                url: '/admin/project/add',
                headers: {
                    token: localStorage.getItem('access_token')
                },
                data: data
            })
            dispatch(saveAddProject(response.data))
        } catch (err) {
            if (err.response.data) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}

export function editProject(id, data) {
    return async function (dispatch) {
        try {
            const response = await axios({
                method: 'put',
                url: '/admin/project/edit/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                },
                data: data
            })
            dispatch(saveEditProject(response.data))
        } catch (err) {
            if (err.response.data) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}

export function deleteProject(id) {
    return async function (dispatch) {
        try {
            await axios({
                method: 'delete',
                url: '/admin/project/delete/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
            dispatch(saveDeleteProject(id))
        } catch (err) {
            if (err.response.data) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}