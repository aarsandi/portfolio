const initialState = {
    projects: [],
    project: {},
    posts: [],
    post: {},
    skills: [],
    isLoading: false,
    isError: false,
    errorMessage: {}
}

function site(state = initialState, action) {
    // HOME
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

    // Loading and Error
    if (action.type === 'SITE_SET_LOADING') {
        return { ...state, isLoading: true }
    }

    if (action.type === 'SITE_SET_ERROR') {
        return { ...state, isError: true, errorMessage: action.payload }
    }
    return state
}

export default site