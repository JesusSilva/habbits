/* eslint-disable camelcase */
import { useForm } from 'react-hook-form'
import { useBookings } from '../../lib/Bookings'
import { useUsers } from '../../lib/Users'

import styled from 'styled-components'

import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import getTime from 'date-fns/getTime'

export default function NewBooking() {
  // eslint-disable-next-line no-unused-vars
  const [state, actions] = useBookings()
  // eslint-disable-next-line no-unused-vars
  const [stateUsers, actionsUsers] = useUsers()
  const { register, handleSubmit } = useForm()

  const onNew = (data) => {
    data.date = getTime(new Date(data.date))
    actions.createBooking(data)
  }

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '24px 0 12px 24px', borderRadius: '4px' }}>
      <span>Añadir una cita</span>
      <form onSubmit={handleSubmit(onNew)}>
        <TextField
          placeholder="Fecha"
          label="Fecha"
          id="datetime-local"
          type="datetime-local"
          defaultValue={new Date()}
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true
          }}
          {...register('date', { required: true })}
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
        />

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
          label="Phone"
          variant="outlined"
          placeholder="Phone"
          {...register('phone', { required: true })}
        />

        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Descripcion"
          variant="outlined"
          placeholder="Descripcion"
          {...register('description', { required: true })}
        />

        <BtnPrimary style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }} type="submit">
          Añadir cita
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
