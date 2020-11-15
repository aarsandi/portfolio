const initialState = {
    posts: [],
    post: {},
    projects: [],
    project: {},
    postcategories: [],
    postcategory: {},
    projectcategories: [],
    projectcategory: {},
    userLogin: {},
    isLoading: false,
    isError: false,
    errorMessage: {},
    skills: [],
    skill: {}
}

function admin(state = initialState, action) {
    // Home
    if (action.type === 'SETALLDATAADMIN') {
        return { ...state, posts: action.payload.posts, projects: action.payload.projects, userLogin: action.payload.user, isLoading: false, isError: false }
    }
    if (action.type === 'LOGOUT') {
        return { ...state, userLogin: {} }
    }

    // Skill
    if (action.type === 'SETALLSKILLS') {
        return { ...state, skills: action.payload, isLoading: false, isError: false }
    }
    if (action.type === 'SETONESKILL') {
        return { ...state, skill: action.payload, isLoading: false, isError: false }
    }
    
    // POST
    if (action.type === 'SETALLPOSTS') {
        return { ...state, posts: action.payload, isLoading: false, isError: false }
    }
    if (action.type === 'SETONEPOST') {
        return { ...state, post: action.payload, isLoading: false, isError: false }
    }
    if (action.type === "DELETEPOST") {
        return { ...state, posts: state.posts.filter(post => post.id !== action.payload) }
    }

    // POST CATEGORY
    if (action.type === 'SETALLPOSTCATEGORY') {
        return { ...state, postcategories: action.payload, isLoading: false, isError: false }
    }
    if (action.type === 'SETONEPOSTCATEGORY') {
        return { ...state, postcategory: action.payload, isLoading: false, isError: false }
    }
    if (action.type === "ADDPOSTCATEGORY") {
        return { ...state, postcategories: [action.payload].concat(state.postcategories) }
    }
    if (action.type === "DELETEPOSTCATEGORY") {
        return { ...state, postcategories: state.postcategories.filter(data => data.id !== action.payload) }
    }

    // PROJECT CATEGORY
    if (action.type === 'SETALLPROJECTCATEGORY') {
        return { ...state, projectcategories: action.payload, isLoading: false, isError: false }
    }
    if (action.type === 'SETONEPROJECTCATEGORY') {
        return { ...state, projectcategory: action.payload, isLoading: false, isError: false }
    }
    if (action.type === "ADDPROJECTCATEGORY") {
        return { ...state, projectcategories: [action.payload].concat(state.projectcategories) }
    }
    if (action.type === "DELETEPROJECTCATEGORY") {
        return { ...state, projectcategories: state.projectcategories.filter(data => data.id !== action.payload) }
    }

    // PROJECT
    if (action.type === 'SETALLPROJECTS') {
        return { ...state, projects: action.payload, isLoading: false, isError: false }
    }
    if (action.type === 'SETONEPROJECT') {
        return { ...state, project: action.payload, isLoading: false, isError: false }
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