import axios from "axios"
import { baseUrl } from "./apiConfig"

const register = (data) => {
    return axios({
        method: 'POST',
        url: `${baseUrl}/auth/register`,
        data: { ...data }
    })
}

export {
    register,
}