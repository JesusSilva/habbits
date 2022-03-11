import axios from 'axios'
import { createStore, createHook, defaults } from 'react-sweet-state'
import { FormatUrl } from '../utils/format-url'

if (typeof window !== 'undefined') {
  defaults.devtools = true
}

const getTrainings = () => async ({ setState, getState }) => {
  const response = await axios.get('http://0.0.0.0:3001/trainings')

  if (response.status === 200) {
    setState({ trainings: response.data })
  }
}

const filters = (data) => async ({ setState, getState }) => {
  const url = FormatUrl('http://0.0.0.0:3001/trainings', data)
  const response = await axios.get(url)

  if (response.status === 200) {
    setState({ trainings: response.data })
  }
}

const createTraining = (data) => async ({ setState, getState }) => {
  const response = await axios.post('http://0.0.0.0:3001/trainings', data)

  if (response.status === 200) {
    setState({ trainings: [...getState().trainings, response.data] })
  }
}

const deleteTraining = (id) => async ({ setState, getState }) => {
  const response = await axios.delete(`http://0.0.0.0:3001/trainings/${id}`)

  if (response.status === 200) {
    setState({ trainings: getState().trainings?.filter(user => user.id !== id) })
  }
}

const Store = createStore({
  initialState: { trainings: [] },

  actions: {
    getTrainings,
    filters,
    createTraining,
    deleteTraining
  },

  name: 'Trainings'
})

export const useTrainings = createHook(Store)
