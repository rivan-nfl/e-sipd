import axios from "axios"
import { baseUrl } from "./apiConfig"

const getAllUsers = (token) => {
    return axios({
        method: 'GET',
        url: `${baseUrl}/users`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getProfile = (id, token) => {
    return axios({
        method: 'GET',
        url: `${baseUrl}/users/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getUserById = (token, userId) => {
    return axios({
        method: 'GET',
        url: `${baseUrl}/users/${userId}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const editAnggota = (id, token, data) => {
    return axios({
        method: 'PUT',
        url: `${baseUrl}/users/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { ...data }
    })
}

const deleteAnggota = (id, token) => {
    return axios({
        method: 'DELETE',
        url: `${baseUrl}/users/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
    })
}

export {
    getAllUsers,
    getProfile,
    getUserById,
    editAnggota,
    deleteAnggota
}