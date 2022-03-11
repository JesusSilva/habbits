import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

interface Props {
  training: {
    id: string
    name: string
    description: string
    exercises: any[]
  }
}

export default function TrainingsComponent(props: Props) {
  return (
    <section style={{ background: '#EAFAF3', width: '100%', borderRadius: '4px', padding: '24px', marginBottom: '24px' }}>
      <h3 style={{ marginTop: '0' }}>{props.training?.name}:</h3>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
      {props.training.exercises.map((exercise, index) => (
            <Card key={exercise.id} sx={{ maxWidth: 328 }} style={{ margin: '12px' }}>
              <CardMedia component="img" height="328" image={exercise.image} alt={exercise.name} />
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
            </Card>
      ))}
      </div>
    </section>
  )
}
