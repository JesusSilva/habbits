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
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDiets } from '../lib/Diets'
import { useUsers } from '../lib/Users'

import styledComponents from 'styled-components'
import getTime from 'date-fns/getTime'
import NewDiet from '../components/Diet/NewDiet'

export default function Diets() {
  const [state, actions] = useDiets()
  const [stateUsers, actionsUsers] = useUsers()
  const { register, handleSubmit } = useForm()

  const onFilter = (data) => {
    data.date = getTime(new Date(data.date))
    console.table(data)
    // actions.filters(data)
  }

  useEffect(() => {
    actions.getDiets()
    actionsUsers.getUsers()
  }, [])

  return (
    <section
      style={{ background: '#f0f3f6', width: '100%', height: 'calc(100% - 64px)', minHeight: 'calc(100vh - 64px)', paddingTop: '32px' }}
    >
      <section className="container">
        <NewDiet />
        <section className="card" style={{ marginTop: '24px' }}>
          <span>Dietas en Base de Datos</span>
          <form onSubmit={handleSubmit(onFilter)} style={{ margin: '24px 0 12px 0', display: 'flex', justifyContent: 'flex-end' }}>
            <TextField
              style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              placeholder="Nombre"
              {...register('name', {})}
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
              label="Instrucciones"
              variant="outlined"
              placeholder="Instrucciones"
              {...register('instructions', {})}
            />

            <TextField
              style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
              id="outlined-basic"
              label="Observaciones"
              variant="outlined"
              placeholder="Observaciones"
              {...register('observations', {})}
            />

            <BtnPrimary style={{ margin: '12px 0 12px 0', width: 'calc(20% - 24px)' }} type="submit">
              Filtrar
            </BtnPrimary>
          </form>
          <TableContainer style={{ borderRadius: '4px', marginTop: '24px' }}>
            <Table sx={{ minWidth: 600 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Nombre</StyledTableCell>
                  <StyledTableCell align="center">Usuario</StyledTableCell>
                  <StyledTableCell align="center">Instrucciones</StyledTableCell>
                  <StyledTableCell align="center">Observaciones</StyledTableCell>
                  <StyledTableCell align="center">Opciones</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.diets.map((row) => (
                  <StyledTableRow key={row.date}>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.user?.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.instructions}</StyledTableCell>
                    <StyledTableCell align="center">{row.observations}</StyledTableCell>
                    <StyledTableCell align="center">
                      <DeleteOutlinedIcon onClick={() => actions.deleteDiet(row.id)} />
                    </StyledTableCell>
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
