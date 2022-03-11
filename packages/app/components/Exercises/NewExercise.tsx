/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { useForm } from 'react-hook-form'
import { useExercises } from '../../lib/Exercises'
import { useUsers } from '../../lib/Users'

import styledComponents from 'styled-components'

import TextField from '@mui/material/TextField'

export default function NewExercise() {
  const [state, actions] = useExercises()
  const [stateUsers, actionsUsers] = useUsers()
  const { register, handleSubmit } = useForm()

  const rows = ['breakfast', 'midmorning', 'meals', 'snack', 'dinner']

  const onNew = (data) => {
    actions.createExercise(data)
  }

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '24px 0 12px 24px', borderRadius: '4px' }}>
      <span>Añadir nuevo ejercicio</span>
      <form onSubmit={handleSubmit(onNew)} style={{ marginBottom: '12px' }}>
        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Nombre"
          variant="outlined"
          placeholder="Nombre"
          {...register('name', { required: true })}
        />
        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Descripción"
          variant="outlined"
          placeholder="Descripción"
          {...register('description', { required: true })}
        />
        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Máquina"
          variant="outlined"
          placeholder="Máquina"
          {...register('mechanics', {})}
        />
        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Músculo"
          variant="outlined"
          placeholder="Músculo"
          {...register('muscle', { required: true })}
        />
        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Material"
          variant="outlined"
          placeholder="Material"
          {...register('material', {})}
        />
        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Nivel"
          variant="outlined"
          placeholder="Nivel"
          {...register('level', { required: true })}
        />
        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Imagen"
          variant="outlined"
          placeholder="Imagen"
          {...register('image', { required: true })}
        />
        <BtnPrimary style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }} type="submit">
          Añadir ejercicio
        </BtnPrimary>
      </form>
    </section>
  )
}

const BtnPrimary = styledComponents.button`
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
