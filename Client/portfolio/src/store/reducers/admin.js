const initialState = {
    posts: [],
    post: {},
    projects: [],
    project: {},
    isLoading: false,
    isError: false,
    errorMessage: {}
}

function admin(state = initialState, action) {
    // POST
    if (action.type === 'SETALLPOSTS') {
        return { ...state, posts: action.payload, isLoading: false }
    }

    if (action.type === 'SETONEPOST') {
        return { ...state, post: action.payload, isLoading: false }
    }

    if (action.type === "ADDPOST") {
        return { ...state, posts: state.posts.concat(action.payload) }
    }

    if (action.type === "EDITPOST") {
        const index = state.posts.findIndex(x => x.id === action.payload.id)
        return { 
            ...state, posts: state.posts.splice(index, 1, action.payload)
        }
    }

    if (action.type === "DELETEPOST") {
        return { ...state, posts: state.posts.filter(post => post.id !== action.payload) }
    }

    // PROJECT
    if (action.type === 'SETALLPROJECTS') {
        return { ...state, projects: action.payload, isLoading: false }
    }

    if (action.type === 'SETONEPROJECT') {
        return { ...state, project: action.payload, isLoading: false }
    }

    if (action.type === "ADDPROJECT") {
        return { ...state, projects: state.projects.concat(action.payload) }
    }

    if (action.type === "EDITPROJECT") {
        const index = state.projects.findIndex(x => x.id === action.payload.id)
        return { 
            ...state, projects: state.projects.splice(index, 1, action.payload)
        }
    }

    if (action.type === "DELETEPROJECT") {
        return { ...state, projects: state.projects.filter(project => project.id !== action.payload) }
    }

    // Loading and Error
    if (action.type === 'SET_LOADING') {
        return { ...state, isLoading: true }
    }

    if (action.type === 'SET_ERROR') {
        return { ...state, isError: true, errorMessage: action.payload }
    }
    return state
}

export default admin