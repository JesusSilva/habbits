import axios from 'axios'
import { createStore, createHook, defaults } from 'react-sweet-state'
import { FormatUrl } from '../utils/format-url'

if (typeof window !== 'undefined') {
  defaults.devtools = true
}

const getMeasures = () => async ({ setState, getState }) => {
  const response = await axios.get('http://0.0.0.0:3001/measures')

  if (response.status === 200) {
    setState({ measures: response.data })
  }
}

const filters = (data) => async ({ setState, getState }) => {
  const url = FormatUrl('http://0.0.0.0:3001/measures', data)
  const response = await axios.get(url)

  if (response.status === 200) {
    setState({ measures: response.data })
  }
}

const createMeasure = (data) => async ({ setState, getState }) => {
  const response = await axios.post('http://0.0.0.0:3001/measures', data)

  if (response.status === 200) {
    setState({ measures: [...getState().measures, response.data] })
  }
}

const deleteMeasure = (id) => async ({ setState, getState }) => {
  const response = await axios.delete(`http://0.0.0.0:3001/measures/${id}`)

  if (response.status === 200) {
    setState({ measures: getState().measures?.filter(user => user.id !== id) })
  }
}

const Store = createStore({
  initialState: { measures: [] },

  actions: {
    getMeasures,
    filters,
    createMeasure,
    deleteMeasure
  },

  name: 'Measures'
})

export const useMeasures = createHook(Store)
