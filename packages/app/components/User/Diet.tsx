import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { FormatRow } from '../../utils/format-diet'

interface Diet {
  diets: {
    name: string
    instructions: string
    observations: string
    days: any[]
  }
}

export default function DietComponent(props: Diet) {
  const rows = FormatRow(props.diets)

  return (
    <TableContainer style={{ borderRadius: '4px' }}>
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
          {rows.map((row) => (
            <StyledTableRow key={row.comida}>
              <StyledTableCell component="th" scope="row">
                {row.comida}
              </StyledTableCell>
              <StyledTableCell align="center">{row.lunes}</StyledTableCell>
              <StyledTableCell align="center">{row.martes}</StyledTableCell>
              <StyledTableCell align="center">{row.miercoles}</StyledTableCell>
              <StyledTableCell align="center">{row.jueves}</StyledTableCell>
              <StyledTableCell align="center">{row.viernes}</StyledTableCell>
              <StyledTableCell align="center">{row.sabado}</StyledTableCell>
              <StyledTableCell align="center">{row.domingo}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
