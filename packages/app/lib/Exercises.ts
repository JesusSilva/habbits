import axios from 'axios'
import { createStore, createHook, defaults } from 'react-sweet-state'
import { FormatUrl } from '../utils/format-url'

if (typeof window !== 'undefined') {
  defaults.devtools = true
}

const getExercises = () => async ({ setState, getState }) => {
  const response = await axios.get('http://0.0.0.0:3001/exercises')

  if (response.status === 200) {
    setState({ exercises: response.data })
  }
}

const filters = (data) => async ({ setState, getState }) => {
  const url = FormatUrl('http://0.0.0.0:3001/exercises', data)
  const response = await axios.get(url)

  if (response.status === 200) {
    setState({ exercises: response.data })
  }
}

const createExercise = (data) => async ({ setState, getState }) => {
  const response = await axios.post('http://0.0.0.0:3001/exercises', data)

  if (response.status === 200) {
    setState({ exercises: [...getState().exercises, response.data] })
  }
}

const deleteExercise = (id) => async ({ setState, getState }) => {
  const response = await axios.delete(`http://0.0.0.0:3001/exercises/${id}`)

  if (response.status === 200) {
    setState({ exercises: getState().exercises?.filter(user => user.id !== id) })
  }
}

const Store = createStore({
  initialState: { exercises: [] },

  actions: {
    getExercises,
    filters,
    createExercise,
    deleteExercise
  },

  name: 'Exercises'
})

export const useExercises = createHook(Store)
