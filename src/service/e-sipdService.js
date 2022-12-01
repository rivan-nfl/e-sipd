import axios from "axios"
import { baseUrl } from "./apiConfig"

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

export {
    getAllTransportasi,
    getAllPerjalanan,
    createPerjalanan,
    updatePerjalanan,
}