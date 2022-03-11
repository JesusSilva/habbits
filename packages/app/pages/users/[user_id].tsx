/* eslint-disable camelcase */
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useUsers } from '../../lib/Users'
import MeasuresComponent from '../../components/User/Measures'
// import DietComponent from '../../components/User/Diet'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import MeasuresCharts from '../../components/Measure/MeasuresCharts'
import DietComponent from '../../components/User/Diet'

import format from 'date-fns/format'
import TrainingsComponent from '../../components/User/Trainings'

export default function UserDetails() {
  const router = useRouter()

  const [state, actions] = useUsers()

  useEffect(() => {
    if (!router.isReady) return
    actions.getUserDetails(router.query.user_id)
  }, [router.isReady])

  return (
    <>
      <section className="user-details" style={{ background: '#f0f3f6', width: '100%', height: 'calc(100% - 64px)', paddingTop: '32px' }}>
        <section className="container">
          {state.user.bookings.date && (
            <Alert severity="success" style={{ marginBottom: '24px', backgroundColor: '#00bd56', color: '#ffffff' }}>
              <AlertTitle>Cita confirmada!</AlertTitle>
              Cita programada para el dia {format(new Date(parseInt(state.user.bookings.date)), 'dd-MM-yyyy')} a las{' '}
              {format(new Date(parseInt(state.user.bookings.date)), 'HH:mm')}
            </Alert>
          )}
          <div style={{ width: '100%', display: 'inline-flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ width: '100%', maxWidth: '348px', backgroundColor: '#ffffff', padding: '24px', borderRadius: '4px' }}>
              <h2 style={{ marginTop: '0' }}>Medidas</h2>
              <MeasuresComponent measures={state.user?.measures} />
            </div>
            <div
              style={{
                width: '100%',
                maxWidth: 'calc(100% - 348px - 24px)',
                backgroundColor: '#ffffff',
                padding: '24px',
                borderRadius: '4px'
              }}
            >
              <h2 style={{ marginTop: '0' }}>Progreso</h2>
              <MeasuresCharts />
            </div>
          </div>
          <div style={{ width: '100%', backgroundColor: '#ffffff', padding: '24px', borderRadius: '4px', marginBottom: '24px' }}>
            <h2 style={{ marginTop: '0' }}>Dieta</h2>
            <DietComponent diets={state.user?.diets} />
          </div>
          <div style={{ width: '100%', backgroundColor: '#ffffff', padding: '24px', borderRadius: '4px', marginBottom: '24px' }}>
            <h2 style={{ marginTop: '0' }}>Entrenamiento</h2>
            {state.user?.trainings.map((training) => (
              <div key={training.id}>
                <TrainingsComponent training={training} />
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  )
}
