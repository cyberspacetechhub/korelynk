import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.inntechlab.online/api/',
  withCredentials: true,
})

export default api
