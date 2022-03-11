import axios from 'axios'
import { createStore, createHook, defaults } from 'react-sweet-state'
import { FormatUrl } from '../utils/format-url'

if (typeof window !== 'undefined') {
  defaults.devtools = true
}

export class User {
  id: string
  name: string
  dateOfBirth: number
  email: string
  phone: string
  documentType: string
  documentID: string
  address: string
  city: string
  zip: string
  province: string
  country: string
  bookings: any[]
  diets: any[]
  trainings: any[]
  measures: any[]
}

const getUsers =
  () =>
    async ({ setState, getState }) => {
      const response = await axios.get('http://0.0.0.0:3001/users')

      if (response.status === 200) {
        setState({ users: response.data })
      }
    }

const getUserDetails =
  (id) =>
    async ({ setState, getState }) => {
      const response = await axios.get(`http://0.0.0.0:3001/users/${id}`)

      if (response.status === 200) {
        setState({ user: response.data })
      }
    }

const filters =
  (data) =>
    async ({ setState, getState }) => {
      const url = FormatUrl('http://0.0.0.0:3001/users', data)
      const response = await axios.get(url)

      if (response.status === 200) {
        setState({ users: response.data })
      }
    }

const createUser =
  (data) =>
    async ({ setState, getState }) => {
      const response = await axios.post('http://0.0.0.0:3001/users', data)

      if (response.status === 200) {
        setState({ users: [...getState().users, response.data] })
      }
    }

const deleteUser =
  (id) =>
    async ({ setState, getState }) => {
      const response = await axios.delete(`http://0.0.0.0:3001/users/${id}`)

      if (response.status === 200) {
        setState({ users: getState().users?.filter((user) => user.id !== id) })
      }
    }

const Store = createStore({
  initialState: {
    users: [],
    user: {
      id: null,
      name: null,
      dateOfBirth: null,
      email: null,
      phone: null,
      documentType: null,
      documentID: null,
      address: null,
      city: null,
      zip: null,
      province: null,
      country: null,
      bookings: {
        id: null,
        date: null,
        user: null,
        description: null,
        latitude: null,
        longitude: null,
        address: null
      },
      diets: {
        name: null,
        instructions: null,
        observations: null,
        days: []
      },
      trainings: [],
      measures: {
        height: null,
        breast: null,
        arm: null,
        waist: null,
        hip: null,
        legs: null,
        weight: null
      }
    }
  },

  actions: {
    getUsers,
    getUserDetails,
    filters,
    deleteUser,
    createUser
  },

  name: 'Users'
})

export const useUsers = createHook(Store)
