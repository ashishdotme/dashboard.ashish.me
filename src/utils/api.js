import axios from 'axios'
import baseUrl from './baseUrl'

const api = () => {
  return axios.create({
    baseURL: baseUrl,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

export default api
