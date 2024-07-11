import { combineReducers, createStore } from 'redux'
import user from './user'
import auth from './auth'
import userManagement from './userManagement'
import perjalanan from './perjalanan'
import notifikasi from './notifikasi'
import anggota from './anggota'
import dipa from './dipa'

const store = createStore(combineReducers({ user, auth, userManagement, perjalanan, notifikasi, anggota, dipa }))

export default store