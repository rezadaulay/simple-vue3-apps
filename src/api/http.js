import axios from 'axios'

export default function http() {
    return axios.create({
        baseURL: 'https://api-nnd.sitama.co.id/api/v1/',
        timeout: 1000
    })
}