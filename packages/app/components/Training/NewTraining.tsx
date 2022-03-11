/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { useForm } from 'react-hook-form'
import { useTrainings } from '../../lib/Trainings'
import { useUsers } from '../../lib/Users'

import styled from 'styled-components'

import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import ListItemText from '@mui/material/ListItemText'
import OutlinedInput from '@mui/material/OutlinedInput'
import Checkbox from '@mui/material/Checkbox'

import getTime from 'date-fns/getTime'
import { useExercises } from '../../lib/Exercises'
import { useEffect, useState } from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

export default function NewTraining() {
  const [state, actions] = useTrainings()
  const [stateUsers, actionsUsers] = useUsers()
  const [stateExercises, actionsExercises] = useExercises()
  const { register, handleSubmit } = useForm()
  const [exerciseUseState, setExercises] = useState<string[]>([])

  const onNew = (data) => {
    data.exercises = stateExercises.exercises.filter((exercise) => {
      let flag: boolean = false

      exerciseUseState.forEach((state) => {
        if (exercise.name === state) flag = true
      })

      return flag
    })
    data.exercises = data.exercises.map((exercise) => exercise.id)

    actions.createTraining(data)
  }

  useEffect(() => {
    actions.getTrainings()
    actionsUsers.getUsers()
    actionsExercises.getExercises()
  }, [])

  const handleChange = (event: SelectChangeEvent<typeof exerciseUseState>) => {
    const {
      target: { value }
    } = event
    setExercises(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '24px 0 12px 24px', borderRadius: '4px' }}>
      <span>Añadir un entrenamiento</span>
      <form onSubmit={handleSubmit(onNew)}>
        <FormControl style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}>
          <InputLabel id="select-user-id">Usuarios</InputLabel>
          <Select labelId="select-user-id" id="select-user" {...register('user', {})} label="Usuarios">
            {stateUsers.users.map((user) => (
              <MenuItem key={user?.id} value={user?.id}>
                {user?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Nombre"
          variant="outlined"
          placeholder="Nombre"
          {...register('name', { required: true })}
        />

        <FormControl sx={{ m: 1, width: 300 }} style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}>
          <InputLabel id="multiple-checkbox-label">Ejercicios</InputLabel>
          <Select
            labelId="multiple-checkbox-label"
            id="multiple-checkbox"
            multiple
            value={exerciseUseState}
            onChange={handleChange}
            input={<OutlinedInput label="Ejercicios" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {stateExercises.exercises.map((exercise) => (
              <MenuItem key={exercise.name} value={exercise.name}>
                <Checkbox checked={exerciseUseState.indexOf(exercise.name) > -1} />
                <ListItemText primary={exercise.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Descripcion"
          variant="outlined"
          placeholder="Descripcion"
          {...register('description', { required: true })}
        />

        <BtnPrimary style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }} type="submit">
          Añadir entrenamiento
        </BtnPrimary>
      </form>
    </section>
  )
}

const BtnPrimary = styled.button`
  height: 56px;
  width: 195px;
  padding: 8px 16px;
  background: #00bd56;
  border: 1px solid #00bd56;
  border-radius: 4px;
  cursor: pointer;
  color: #ffffff;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  &:hover {
    background: #03ac50;
  }
`
