import axios from 'axios'

export const BaseRoute = axios.create({ baseURL: 'http://127.0.0.1:3001' })
