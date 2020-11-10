import { combineReducers } from 'redux'

import admin from './admin'
import site from './site'

export default combineReducers({
    adminReducer: admin,
    siteReducer: site
})