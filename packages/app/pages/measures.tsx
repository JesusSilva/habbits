import { useEffect } from 'react'
import { useMeasures } from '../lib/Measures'
import { useForm } from 'react-hook-form'
import NewMeasure from '../components/Measure/NewMeasure'

import styledComponents from 'styled-components'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { styled } from '@mui/material/styles'
import { useUsers } from '../lib/Users'

export default function Measures() {
  const [state, actions] = useMeasures()
  const [stateUsers, actionsUsers] = useUsers()
  const { register, handleSubmit } = useForm()

  const onFilter = (data) => {
    actions.filters(data)
  }

  useEffect(() => {
    actions.getMeasures()
    actionsUsers.getUsers()
  }, [])

  return (
    <>
      <section style={{ background: '#f0f3f6', width: '100%', height: 'calc(100vh - 64px)', paddingTop: '32px' }}>
        <section className="container">
          <NewMeasure />
          <section className="card" style={{ marginTop: '24px' }}>
            <span style={{ marginBottom: '24px' }}>Medidas en Base de Datos</span>
            <form onSubmit={handleSubmit(onFilter)} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <FormControl style={{ width: '450px' }}>
                <InputLabel id="select-user-id">Usuarios</InputLabel>
                <Select labelId="select-user-id" id="select-user" {...register('user')} label="Usuarios">
                  {stateUsers.users.map((user) => (
                    <MenuItem key={user?.id} value={user?.id}>
                      {user?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <BtnPrimary style={{ width: 'calc((100% - 84px) - 80%)', marginLeft: '24px' }} type="submit">
                Filtrar
              </BtnPrimary>
            </form>

            <TableContainer style={{ borderRadius: '4px' }}>
              <Table sx={{ minWidth: 600 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Fecha</StyledTableCell>
                    <StyledTableCell align="center">Usuario</StyledTableCell>
                    <StyledTableCell align="center">Altura</StyledTableCell>
                    <StyledTableCell align="center">Peso</StyledTableCell>
                    <StyledTableCell align="center">Pecho</StyledTableCell>
                    <StyledTableCell align="center">Brazo</StyledTableCell>
                    <StyledTableCell align="center">Cintura</StyledTableCell>
                    <StyledTableCell align="center">Caderas</StyledTableCell>
                    <StyledTableCell align="center">Piernas</StyledTableCell>
                    <StyledTableCell align="center">Opciones</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.measures.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell align="center">{row.date}</StyledTableCell>
                      <StyledTableCell align="center">{row.user?.name}</StyledTableCell>
                      <StyledTableCell align="center">{row.height}</StyledTableCell>
                      <StyledTableCell align="center">{row.weight}</StyledTableCell>
                      <StyledTableCell align="center">{row.breast}</StyledTableCell>
                      <StyledTableCell align="center">{row.arm}</StyledTableCell>
                      <StyledTableCell align="center">{row.waist}</StyledTableCell>
                      <StyledTableCell align="center">{row.hip}</StyledTableCell>
                      <StyledTableCell align="center">{row.legs}</StyledTableCell>
                      <StyledTableCell align="center">
                        <DeleteOutlinedIcon onClick={() => actions.deleteMeasure(row.id)} />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
        </section>
      </section>
    </>
  )
}

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
