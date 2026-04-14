import axios from 'axios'

const api = axios.create({
  baseURL: 'https://korelynk.onrender.com/api/',
  withCredentials: true,
})

export default api
