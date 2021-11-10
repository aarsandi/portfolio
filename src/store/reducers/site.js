const initialState = {
    featuredprojects: null,
    projects: null,
    project: null,
    skills: null
}

function site(state = initialState, action) {
    // Home
    if (action.type === 'SITEHOMEDATA') {
        return { ...state, featuredprojects: action.payload.projects, skills: action.payload.skills }
    }
    
    // PROJECT
    if (action.type === 'SITEALLPROJECTS') {
        return { ...state, projects: action.payload }
    }

    if (action.type === 'SITEONEPROJECT') {
        return { ...state, project: action.payload }
    }


    return state
}

export default site