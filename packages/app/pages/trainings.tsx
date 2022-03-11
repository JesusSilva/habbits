import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTrainings } from '../lib/Trainings'
import NewTraining from '../components/Training/NewTraining'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import TextField from '@mui/material/TextField'

import styledComponents from 'styled-components'

export default function Trainings() {
  const [state, actions] = useTrainings()
  const { register, handleSubmit } = useForm()

  const onFilter = (data) => {
    actions.filters(data)
  }

  useEffect(() => {
    actions.getTrainings()
  }, [])

  return (
    <section
      style={{ background: '#f0f3f6', width: '100%', height: 'calc(100% - 64px)', minHeight: 'calc(100vh - 64px)', paddingTop: '32px' }}
    >
      <section className="container">
        <NewTraining />

        <section className="card" style={{ marginTop: '24px' }}>
          <span>Entrenamientos en Base de Datos</span>
          <form onSubmit={handleSubmit(onFilter)} style={{ marginBottom: '12px' }}>
            <TextField
              style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              placeholder="Nombre"
              {...register('name', {})}
            />
            <TextField
              style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              placeholder="Email"
              {...register('email', {})}
            />
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
              label="Ciudad"
              variant="outlined"
              placeholder="Ciudad"
              {...register('city', {})}
            />
            <BtnPrimary style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }} type="submit">
              Filtrar
            </BtnPrimary>
          </form>

          <TableContainer style={{ borderRadius: '4px' }}>
            <Table sx={{ minWidth: 600 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Nombre</StyledTableCell>
                  <StyledTableCell align="center">Ejercicios</StyledTableCell>
                  <StyledTableCell align="center">Descripcion</StyledTableCell>
                  <StyledTableCell align="center">Opciones</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.trainings.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.exercises.map(exercise => exercise.name).join(', ')}</StyledTableCell>
                    <StyledTableCell align="center">{row.description}</StyledTableCell>
                    <StyledTableCell align="center">
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <DeleteOutlinedIcon style={{ marginLeft: '16px' }} onClick={() => actions.deleteTraining(row.id)} />
                      </div>
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
