import axios from "axios"
import { baseUrl } from "./apiConfig"

const getAllNotifications = (token) => {
    return axios({
        method: 'GET',
        url: `${baseUrl}/notifications`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const editNotification = (id, token, data) => {
    return axios({
        method: 'PUT',
        url: `${baseUrl}/notifications/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { ...data }
    })
}

export {
    getAllNotifications,
    editNotification
}