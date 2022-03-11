import axios from 'axios'
import { createStore, createHook, defaults } from 'react-sweet-state'
import { FormatUrl } from '../utils/format-url'

if (typeof window !== 'undefined') {
  defaults.devtools = true
}

const getBookings = () => async ({ setState, getState }) => {
  const response = await axios.get('http://0.0.0.0:3001/bookings')

  if (response.status === 200) {
    setState({ bookings: response.data })
  }
}

const filters = (data) => async ({ setState, getState }) => {
  const url = FormatUrl('http://0.0.0.0:3001/bookings', data)
  const response = await axios.get(url)

  if (response.status === 200) {
    setState({ bookings: response.data })
  }
}

const createBooking = (data) => async ({ setState, getState }) => {
  const response = await axios.post('http://0.0.0.0:3001/bookings', data)

  if (response.status === 200) {
    setState({ bookings: [...getState().bookings, response.data] })
  }
}

const deleteBooking = (id) => async ({ setState, getState }) => {
  const response = await axios.delete(`http://0.0.0.0:3001/bookings/${id}`)

  if (response.status === 200) {
    setState({ bookings: getState().bookings?.filter(user => user.id !== id) })
  }
}

const Store = createStore({
  initialState: { bookings: [] },

  actions: {
    getBookings,
    filters,
    createBooking,
    deleteBooking
  },

  name: 'Bookings'
})

export const useBookings = createHook(Store)
