const initialState = {
    projects: [],
    project: {},
    posts: [],
    post: {},
    isLoading: false,
    isError: false,
}

function site(state = initialState, action) {
    // HOME
    if (action.type === 'SITEHOMEDATA') {
        return { ...state, projects: action.payload.projects, posts: action.payload.posts, isLoading: false }
    }
    // PROJECT
    if (action.type === 'SITEALLPROJECTS') {
        return { ...state, projects: action.payload, isLoading: false }
    }

    if (action.type === 'SITEONEPROJECT') {
        return { ...state, project: action.payload, isLoading: false }
    }

    // Loading and Error
    if (action.type === 'SITE_SET_LOADING') {
        return { ...state, isLoading: true }
    }

    if (action.type === 'SITE_SET_ERROR') {
        return { ...state, isError: true }
    }
    return state
}

export default site