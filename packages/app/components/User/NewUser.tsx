/* eslint-disable camelcase */
import { useForm } from 'react-hook-form'
import { useUsers } from '../../lib/Users'
import TextField from '@mui/material/TextField'
import styled from 'styled-components'
import { getTime, format } from 'date-fns'

export default function NewUser() {
  // eslint-disable-next-line no-unused-vars
  const [state, actions] = useUsers()
  const { register, handleSubmit } = useForm()

  const onNew = (data) => {
    data.dateOfBirth = getTime(new Date(data.dateOfBirth))
    console.log(format(data.dateOfBirth, 'dd-MM-yyyy'))
    actions.createUser(data)
  }

  return (
    <section className="card">
      <span>Crear usuario nuevo</span>
      <form onSubmit={handleSubmit(onNew)}>
        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Nombre"
          variant="outlined"
          placeholder="Nombre"
          {...register('name', { required: true })}
        />

        <TextField
          placeholder="Fecha de nacimiento"
          label="Fecha de nacimiento"
          id="date"
          type="date"
          InputLabelProps={{
            shrink: true
          }}
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          {...register('dateOfBirth', { required: true })}
        />

        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          placeholder="Email"
          {...register('email', { required: true })}
        />

        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Teléfono"
          variant="outlined"
          placeholder="Teléfono"
          {...register('phone', { required: true })}
        />

        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Tipo de documento"
          variant="outlined"
          placeholder="Tipo de documento"
          {...register('documentType', { required: true })}
        />

        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Documento"
          variant="outlined"
          placeholder="Documento"
          {...register('documentID', { required: true })}
        />

        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Dirección"
          variant="outlined"
          placeholder="Dirección"
          {...register('address', {})}
        />

        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Ciudad"
          variant="outlined"
          placeholder="Ciudad"
          {...register('city', {})}
        />

        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Código postal"
          variant="outlined"
          placeholder="Código postal"
          {...register('zip', {})}
        />

        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="Provincia"
          variant="outlined"
          placeholder="Provincia"
          {...register('province', {})}
        />

        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
          id="outlined-basic"
          label="País"
          variant="outlined"
          placeholder="País"
          {...register('country', {})}
        />
        <BtnPrimary style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }} type="submit">
          Crear usuario
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
