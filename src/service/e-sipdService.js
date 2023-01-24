import axios from "axios"
import { baseUrl } from "./apiConfig"

const getAllPerjalanan = (token, params) => {
    return axios({
        method: 'GET',
        url: `${baseUrl}/e-sipd`,
        params: { ...params },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const createPerjalanan = (token, data) => {
    return axios({
        method: 'POST',
        url: `${baseUrl}/e-sipd`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: { ...data }
    })
}

const updatePerjalanan = (token, id, data) => {
    return axios({
        method: 'PUT',
        url: `${baseUrl}/e-sipd/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: { ...data }
    })
}

const editPerjalanan = (token, id, data) => {
    return axios({
        method: 'PUT',
        url: `${baseUrl}/e-sipd/update/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: { ...data }
    })
}

const getAllTransportasi = (token, params) => {
    return axios({
        method: 'GET',
        url: `${baseUrl}/e-sipd/transportasi`,
        params: { ...params },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getAnggaran = (token, params) => {
    return axios({
        method: 'GET',
        url: `${baseUrl}/e-sipd/anggaran`,
        params: { ...params },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getPangkat = (token, params) => {
    return axios({
        method: 'GET',
        url: `${baseUrl}/e-sipd/pangkat`,
        params: { ...params },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export {
    getAllPerjalanan,
    createPerjalanan,
    updatePerjalanan,
    editPerjalanan,
    getAllTransportasi,
    getAnggaran,
    getPangkat,
}