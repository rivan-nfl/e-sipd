import { combineReducers, createStore } from 'redux'
import user from './user'
import auth from './auth'

const store = createStore(combineReducers({user, auth}))

export default store