import axios from '../../api/axios'

// Loading and Error
export function setLoading() {
    return { type: 'SET_LOADING'}
}
export function setError(error) {
    return { type: 'SET_ERROR', payload: error }
}
export function setAllDataAdmin(data) {
    return { type: 'SETALLDATAADMIN', payload: data }
}
export function setLogout() {
    return { type: 'LOGOUT' }
}

// Skill
export function setAllSkills(skills) {
    return { type: 'SETALLSKILLS', payload: skills }
}
export function setOneSkill(skill) {
    return { type: 'SETONESKILL', payload: skill }
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

// Skill Actions
export function fetchAllSkills() {
    return async function (dispatch) {
        try {
            dispatch(setLoading())
            const response = await axios({
                method: 'get',
                url: '/admin/skills',
                headers: {
                    token: localStorage.getItem('access_token')
                }
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
export function fetchOneSkill(id) {
    return async function (dispatch) {
        try {
            dispatch(setLoading())
            const response = await axios({
                method: 'get',
                url: '/admin/skill/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
            dispatch(setOneSkill(response.data))
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
                url: '/admin/skill/edit/'+id,
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
                url: '/admin/posts',
                headers: {
                    token: localStorage.getItem('access_token')
                }
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
                url: '/admin/post/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                }
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
                url: '/admin/post/add',
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
                url: '/admin/post/edit/'+id,
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
                url: '/admin/post/delete/'+id,
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
                url: '/admin/postcategories',
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
                url: '/admin/postcategory/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                }
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
                url: '/admin/postcategory/add',
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
                url: '/admin/postcategory/edit/'+id,
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
                url: '/admin/postcategory/delete/'+id,
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
                url: '/admin/projects',
                headers: {
                    token: localStorage.getItem('access_token')
                }
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
                url: '/admin/project/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                }
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
                url: '/admin/project/add',
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
                url: '/admin/project/edit/'+id,
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
                url: '/admin/project/delete/'+id,
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
                url: '/admin/projectcategories',
                headers: {
                    token: localStorage.getItem('access_token')
                }
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
                url: '/admin/projectcategory/'+id,
                headers: {
                    token: localStorage.getItem('access_token')
                }
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
                url: '/admin/projectcategory/add',
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
                url: '/admin/projectcategory/edit/'+id,
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
                url: '/admin/projectcategory/delete/'+id,
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