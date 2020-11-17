const initialState = {
    isLoading: false,
    isError: false,
    errorMessage: {},
    projects: [],
    project: {},
    posts: [],
    post: {},
    skills: []
}

function site(state = initialState, action) {
    // Loading and Error
    if (action.type === 'SITE_SET_LOADING') {
        return { ...state, isLoading: true }
    }

    if (action.type === 'SITE_SET_ERROR') {
        return { ...state, isError: true, errorMessage: action.payload }
    }

    // Home
    if (action.type === 'SITEHOMEDATA') {
        return { ...state, projects: action.payload.projects, posts: action.payload.posts, skills: action.payload.skills, isLoading: false, isError: false }
    }
    
    // PROJECT
    if (action.type === 'SITEALLPROJECTS') {
        return { ...state, projects: action.payload, isLoading: false, isError: false }
    }

    if (action.type === 'SITEONEPROJECT') {
        return { ...state, project: action.payload, isLoading: false, isError: false }
    }


    return state
}

export default site