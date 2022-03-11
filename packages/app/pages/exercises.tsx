/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useExercises } from '../lib/Exercises'
import NewExercise from '../components/Exercises/NewExercise'

import styledComponents from 'styled-components'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function Exercises() {
  const [state, actions] = useExercises()
  const { register, handleSubmit } = useForm()
  const onFilter = (data) => {
    actions.filters(data)
  }

  useEffect(() => {
    actions.getExercises()
  }, [])

  return (
    <section
      style={{ background: '#f0f3f6', width: '100%', height: 'calc(100% - 64px)', minHeight: 'calc(100vh - 64px)', paddingTop: '32px' }}
    >
      <section className="container">
        <NewExercise />
        <section className="card" style={{ marginTop: '24px' }}>
          <span>Ejercicios en Base de Datos</span>
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
              label="Descripción"
              variant="outlined"
              placeholder="Descripción"
              {...register('description', {})}
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
              {...register('muscle', {})}
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
              {...register('level', {})}
            />
            <TextField
              style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }}
              id="outlined-basic"
              label="Imagen"
              variant="outlined"
              placeholder="Imagen"
              {...register('image', {})}
            />
            <BtnPrimary style={{ margin: '12px 24px 12px 0', width: 'calc(20% - 24px)' }} type="submit">
              Filtrar
            </BtnPrimary>
          </form>
        </section>
        <section style={{ display: 'flex', flexWrap: 'wrap', padding: '12px' }}>
          {state.exercises.map((exercise, index) => (
            <Card key={exercise.id} sx={{ maxWidth: 340 }} style={{ margin: '12px' }}>
              <CardMedia component="img" height="345" image={exercise.image} alt={exercise.name} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {exercise.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {exercise.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  &nbsp;
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Máquina: {exercise.mechanics}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Músculo: {exercise.muscle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Material: {exercise.material}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nivel: {exercise.level}
                </Typography>
              </CardContent>
              <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <DeleteOutlinedIcon onClick={() => actions.deleteExercise(exercise.id)} />
              </CardActions>
            </Card>
          ))}
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

// ['name', 'description', 'mechanics', 'muscle', 'material', 'level', 'image']
