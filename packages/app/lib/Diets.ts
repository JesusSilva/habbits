import axios from 'axios'
import { createStore, createHook, defaults } from 'react-sweet-state'
import { FormatUrl } from '../utils/format-url'

if (typeof window !== 'undefined') {
  defaults.devtools = true
}

const getDiets = () => async ({ setState, getState }) => {
  const response = await axios.get('http://0.0.0.0:3001/diets')

  if (response.status === 200) {
    setState({ diets: response.data })
  }
}

const filters = (data) => async ({ setState, getState }) => {
  const url = FormatUrl('http://0.0.0.0:3001/diets', data)
  const response = await axios.get(url)

  if (response.status === 200) {
    setState({ diets: response.data })
  }
}

const createDiet = (data) => async ({ setState, getState }) => {
  const response = await axios.post('http://0.0.0.0:3001/diets', data)

  if (response.status === 200) {
    setState({ diets: [...getState().diets, response.data] })
  }
}

const deleteDiet = (id) => async ({ setState, getState }) => {
  const response = await axios.delete(`http://0.0.0.0:3001/diets/${id}`)

  if (response.status === 200) {
    setState({ diets: getState().diets?.filter(user => user.id !== id) })
  }
}

const Store = createStore({
  initialState: { diets: [] },

  actions: {
    getDiets,
    filters,
    createDiet,
    deleteDiet
  },

  name: 'Diets'
})

export const useDiets = createHook(Store)
