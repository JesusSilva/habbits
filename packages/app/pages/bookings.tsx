import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { useBookings } from '../lib/Bookings'
import { useEffect } from 'react'
import styledComponents from 'styled-components'
import { useForm } from 'react-hook-form'
import { useUsers } from '../lib/Users'
import getTime from 'date-fns/getTime'
import format from 'date-fns/format'
import NewBooking from '../components/Booking/NewBooking'
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
// import Link from 'next/link'

export default function Bookings() {
  const [state, actions] = useBookings()
  const [stateUsers, actionsUsers] = useUsers()
  const { register, handleSubmit } = useForm()
  const onFilter = (data) => {
    data.date = getTime(new Date(data.date))
    actions.filters(data)
  }

  useEffect(() => {
    actions.getBookings()
    actionsUsers.getUsers()
  }, [])

  return (
    <section
      style={{ background: '#f0f3f6', width: '100%', height: 'calc(100% - 64px)', minHeight: 'calc(100vh - 64px)', paddingTop: '32px' }}
    >
      <section className="container">
        <NewBooking />
        <section className="card" style={{ marginTop: '24px' }}>
          <span>Citas en Base de Datos</span>
          <form onSubmit={handleSubmit(onFilter)} style={{ margin: '24px 0 12px 0', display: 'flex', justifyContent: 'flex-end' }}>
            <TextField
              placeholder="Fecha"
              label="Fecha"
              id="date"
              type="date"
              defaultValue={new Date()}
              InputLabelProps={{
                shrink: true
              }}
              style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
              {...register('dateOfBirth', { required: true })}
            />

            <FormControl style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}>
              <InputLabel id="select-user-id">Usuarios</InputLabel>
              <Select labelId="select-user-id" id="select-user" {...register('user')} label="Usuarios">
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
              label="Teléfono"
              variant="outlined"
              placeholder="Teléfono"
              {...register('phone', {})}
            />

            <TextField
              style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
              id="outlined-basic"
              label="Descripción"
              variant="outlined"
              placeholder="Descripción"
              {...register('description', {})}
            />

            <BtnPrimary style={{ margin: '12px 0 12px 0', width: 'calc(20% - 24px)' }} type="submit">
              Filtrar
            </BtnPrimary>
          </form>
          <TableContainer style={{ borderRadius: '4px', marginTop: '24px' }}>
            <Table sx={{ minWidth: 600 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Fecha</StyledTableCell>
                  <StyledTableCell align="center">Cliente</StyledTableCell>
                  <StyledTableCell align="center">Teléfono</StyledTableCell>
                  <StyledTableCell align="center">Descripción</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.bookings.map((row) => (
                  <StyledTableRow key={row.date}>
                    <StyledTableCell align="center">{format(new Date(parseInt(row.date)), 'dd-MM-yyyy')}</StyledTableCell>
                    {/* <StyledTableCell align="center">{row.date}</StyledTableCell> */}
                    <StyledTableCell align="center">{row.user?.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.user?.phone}</StyledTableCell>
                    <StyledTableCell align="center">{row.description}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </section>
    </section>
  )
}

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

const BtnPrimary = styledComponents.button`
  height: 56px;
  width: 160px;
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
