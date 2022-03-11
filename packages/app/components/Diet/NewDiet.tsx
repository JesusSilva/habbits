/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { useForm } from 'react-hook-form'
import { useDiets } from '../../lib/Diets'
import { useUsers } from '../../lib/Users'

import styledComponents from 'styled-components'

import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { FormatNewDiet } from '../../utils/format-new-diet'

export default function NewDiet() {
  const [state, actions] = useDiets()
  const [stateUsers, actionsUsers] = useUsers()
  const { register, handleSubmit } = useForm()

  const rows = ['breakfast', 'midmorning', 'meals', 'snack', 'dinner']

  const onNew = (data) => {
    data = FormatNewDiet(data)
    actions.createDiet(data)
  }

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '24px 0 12px 24px', borderRadius: '4px' }}>
      <span>Añadir nuevas medidas</span>
      <form onSubmit={handleSubmit(onNew)}>
        <FormControl style={{ margin: '12px 24px 12px 0', width: 'calc(25% - 24px)' }}>
          <InputLabel id="select-user-id">Usuarios</InputLabel>
          <Select labelId="select-user-id" id="select-user" {...register('user', { required: true })} label="Usuarios">
            {stateUsers.users.map((user) => (
              <MenuItem key={user?.id} value={user?.id}>
                {user?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(25% - 24px)' }}
          id="outlined-basic"
          label="Nombre"
          variant="outlined"
          placeholder="Nombre"
          {...register('name', { required: true })}
        />

        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(25% - 24px)' }}
          id="outlined-basic"
          label="Instrucciones"
          variant="outlined"
          placeholder="Instrucciones"
          {...register('instructions', { required: true })}
        />

        <TextField
          style={{ margin: '12px 24px 12px 0', width: 'calc(25% - 24px)' }}
          id="outlined-basic"
          label="Observaciones"
          variant="outlined"
          placeholder="Observaciones"
          {...register('observations', { required: true })}
        />

        <TableContainer style={{ borderRadius: '4px', margin: '12px 24px 12px 0', width: 'calc(100% - 24px)' }}>
          <Table sx={{ minWidth: 600 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="center">Lunes</StyledTableCell>
                <StyledTableCell align="center">Martes</StyledTableCell>
                <StyledTableCell align="center">Miercoles</StyledTableCell>
                <StyledTableCell align="center">Jueves</StyledTableCell>
                <StyledTableCell align="center">Viernes</StyledTableCell>
                <StyledTableCell align="center">Sabado</StyledTableCell>
                <StyledTableCell align="center">Domingo</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((comida, index) => (
                <StyledTableRow key={comida}>
                  <StyledTableCell component="th" scope="row">
                    {comida}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField id="outlined-basic" variant="outlined" {...register(`0-${comida}`, { required: true })} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField id="outlined-basic" variant="outlined" {...register(`1-${comida}`, { required: true })} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField id="outlined-basic" variant="outlined" {...register(`2-${comida}`, { required: true })} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField id="outlined-basic" variant="outlined" {...register(`3-${comida}`, { required: true })} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField id="outlined-basic" variant="outlined" {...register(`4-${comida}`, { required: true })} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField id="outlined-basic" variant="outlined" {...register(`5-${comida}`, { required: true })} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField id="outlined-basic" variant="outlined" {...register(`6-${comida}`, { required: true })} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <BtnPrimary style={{ width: 'calc(25% - 24px)', margin: '12px 24px 12px 0' }} type="submit">
            Añadir Dieta
          </BtnPrimary>
        </div>
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#00bd56',
    color: 'white'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#eafaf3'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))
