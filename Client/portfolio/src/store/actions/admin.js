import axios from '../../api/axios'

// Loading and Error
export function setLoading() {
    return { type: 'SET_LOADING'}
}
export function setError(error) {
    return { type: 'SET_ERROR', payload: error }
}

// Home and Logout
export function setAllDataAdmin(data) {
    return { type: 'SETALLDATAADMIN', payload: data }
}
export function setLogout() {
    return { type: 'LOGOUT' }
}

// User


// Skill
export function setAllSkills(skills) {
    return { type: 'SETALLSKILLS', payload: skills }
}

// POST
export function setAllPosts(posts) {
    return { type: 'SETALLPOSTS', payload: posts }
}
export function setOnePost(post) {
    return { type: 'SETONEPOST', payload: post }
}
export function saveDeletePost(id) {
    return { type: 'DELETEPOST', payload: id }
}

// POST Category
export function setAllPostCategories(postcategory) {
    return { type: 'SETALLPOSTCATEGORY', payload: postcategory }
}
export function setOnePostCategory(postcategory) {
    return { type: 'SETONEPOSTCATEGORY', payload: postcategory }
}
export function saveAddPostCategory(postcategory) {
    return { type: 'ADDPOSTCATEGORY', payload: postcategory }
}
export function saveDeletePostCategory(id) {
    return { type: 'DELETEPOSTCATEGORY', payload: id }
}

// PROJECT
export function setAllProjects(projects) {
    return { type: 'SETALLPROJECTS', payload: projects }
}
export function setOneProject(project) {
    return { type: 'SETONEPROJECT', payload: project }
}
export function saveDeleteProject(id) {
    return { type: 'DELETEPROJECT', payload: id }
}

// Project Category
export function setAllProjectCategories(projectcategory) {
    return { type: 'SETALLPROJECTCATEGORY', payload: projectcategory }
}
export function setOneProjectCategory(projectcategory) {
    return { type: 'SETONEPROJECTCATEGORY', payload: projectcategory }
}
export function saveAddProjectCategory(projectcategory) {
    return { type: 'ADDPROJECTCATEGORY', payload: projectcategory }
}
export function saveDeleteProjectCategory(id) {
    return { type: 'DELETEPROJECTCATEGORY', payload: id }
}

// Admin Action
export function fetchDataHome() {
    return async function (dispatch) {
        try {
            dispatch(setLoading())
            const response = await axios({
                method: 'get',
                url: '/admin',
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
            dispatch(setAllDataAdmin(response.data))
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}

// User Actions
export function editUser(id, data) {
    return async function (dispatch) {
        try {
            await axios({
                method: 'put',
                url: '/user/edit/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                },
                data: data
            })
            dispatch(fetchDataHome())
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}

// Skill Actions
export function fetchAllSkills() {
    return async function (dispatch) {
        try {
            dispatch(setLoading())
            const response = await axios({
                method: 'get',
                url: '/skill'
            })
            dispatch(setAllSkills(response.data))
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}
export function editSkill(id, data) {
    return async function (dispatch) {
        try {
            await axios({
                method: 'put',
                url: '/skill/edit/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                },
                data: data
            })
            dispatch(fetchAllSkills())
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}

// Post Actions
export function fetchAllPosts() {
    return async function (dispatch) {
        try {
            dispatch(setLoading())
            const response = await axios({
                method: 'get',
                url: '/post'
            })
            dispatch(setAllPosts(response.data))
        } catch (err) {
            if (err.response) {
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
                url: '/post/'+id
            })
            dispatch(setOnePost(response.data))
        } catch (err) {
            if (err.response) {
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
            await axios({
                method: 'post',
                url: '/post/add',
                headers: {
                    token: localStorage.getItem('access_token')
                },
                data: data
            })
            dispatch(fetchAllPosts())
        } catch (err) {
            if (err.response) {
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
            await axios({
                method: 'put',
                url: '/post/edit/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                },
                data: data
            })
            dispatch(fetchAllPosts())
        } catch (err) {
            if (err.response) {
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
                url: '/post/delete/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
            dispatch(saveDeletePost(id))
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}

// Post Category Actions
export function fetchAllPostCategory() {
    return async function (dispatch) {
        try {
            dispatch(setLoading())
            const response = await axios({
                method: 'get',
                url: '/postcategory',
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
            dispatch(setAllPostCategories(response.data))
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}
export function fetchOnePostCategory(id) {
    return async function (dispatch) {
        try {
            dispatch(setLoading())
            const response = await axios({
                method: 'get',
                url: '/postcategory/'+id
            })
            dispatch(setOnePostCategory(response.data))
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}
export function addPostCategory(data) {
    return async function (dispatch) {
        try {
            const response = await axios({
                method: 'post',
                url: '/postcategory/add',
                headers: {
                    token: localStorage.getItem('access_token')
                },
                data: data
            })
            dispatch(saveAddPostCategory(response.data))
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}
export function editPostCategory(id, data) {
    return async function (dispatch) {
        try {
            await axios({
                method: 'put',
                url: '/postcategory/edit/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                },
                data: data
            })
            dispatch(fetchAllPostCategory())
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}
export function deletePostCategory(id) {
    return async function (dispatch) {
        try {
            await axios({
                method: 'delete',
                url: '/postcategory/delete/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
            dispatch(saveDeletePostCategory(id))
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
            dispatch(setAllProjects(response.data))
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
            dispatch(setOneProject(response.data))
        } catch (err) {
            if (err.response) {
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
            await axios({
                method: 'post',
                url: '/project/add',
                headers: {
                    token: localStorage.getItem('access_token')
                },
                data: data
            })
            dispatch(fetchAllProjects())
        } catch (err) {
            if (err.response) {
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
            await axios({
                method: 'put',
                url: '/project/edit/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                },
                data: data
            })
            dispatch(fetchAllProjects())
        } catch (err) {
            if (err.response) {
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
                url: '/project/delete/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
            dispatch(saveDeleteProject(id))
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}

// Project Category Actions
export function fetchAllProjectCategory() {
    return async function (dispatch) {
        try {
            dispatch(setLoading())
            const response = await axios({
                method: 'get',
                url: '/projectcategory'
            })
            dispatch(setAllProjectCategories(response.data))
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}
export function fetchOneProjectCategory(id) {
    return async function (dispatch) {
        try {
            dispatch(setLoading())
            const response = await axios({
                method: 'get',
                url: '/projectcategory/'+id
            })
            dispatch(setOneProjectCategory(response.data))
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}
export function addProjectCategory(data) {
    return async function (dispatch) {
        try {
            const response = await axios({
                method: 'post',
                url: '/projectcategory/add',
                headers: {
                    token: localStorage.getItem('access_token')
                },
                data: data
            })
            dispatch(saveAddProjectCategory(response.data))
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}
export function editProjectCategory(id, data) {
    return async function (dispatch) {
        try {
            await axios({
                method: 'put',
                url: '/projectcategory/edit/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                },
                data: data
            })
            dispatch(fetchAllProjectCategory())
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}
export function deleteProjectCategory(id) {
    return async function (dispatch) {
        try {
            await axios({
                method: 'delete',
                url: '/projectcategory/delete/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
            dispatch(saveDeleteProjectCategory(id))
        } catch (err) {
            if (err.response) {
                dispatch(setError({ error: err.response.data.error }))
            } else {
                dispatch(setError({ error: 'unhandle error' }))
            }
        }
    }
}