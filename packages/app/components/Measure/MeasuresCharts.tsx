/* eslint-disable camelcase */
import { useEffect, useRef } from 'react'
import { useMeasures } from '../../lib/Measures'
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js'

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
)

export default function MeasuresCharts() {
  // eslint-disable-next-line no-unused-vars
  const [state, actions] = useMeasures()
  const canvasRadar = useRef(null)
  const canvasLine = useRef(null)

  useEffect(() => {
    actions.getMeasures()
  }, [])

  useEffect(() => {
    const ctxRadar = canvasRadar.current.getContext('2d')
    const ctxLine = canvasLine.current.getContext('2d')

    const dataRadar = {
      labels: ['breast', 'arm', 'waist', 'hip', 'legs'],
      datasets: [
        {
          data: [
            state.measures[0]?.breast,
            state.measures[0]?.arm,
            state.measures[0]?.waist,
            state.measures[0]?.hip,
            state.measures[0]?.legs
          ],
          backgroundColor: '#00bd5633',
          borderColor: '#00bd56',
          pointBackgroundColor: '#00bd56',
          pointHoverBorderColor: '#00bd56'
        },
        {
          data: [
            state.measures[1]?.breast,
            state.measures[1]?.arm,
            state.measures[1]?.waist,
            state.measures[1]?.hip,
            state.measures[1]?.legs
          ],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }
      ]
    }

    const dataLine = {
      labels: [state.measures[4]?.date, state.measures[3]?.date, state.measures[2]?.date, state.measures[1]?.date, state.measures[0]?.date],
      datasets: [
        {
          data: [
            state.measures[4]?.weight,
            state.measures[3]?.weight,
            state.measures[2]?.weight,
            state.measures[1]?.weight,
            state.measures[0]?.weight
          ],
          borderColor: '#00bd56',
          backgroundColor: '#00bd5633',
          pointStyle: 'circle',
          pointRadius: 10,
          pointHoverRadius: 15
        }
      ]
    }

    const measureChartsRadar = new Chart(ctxRadar, {
      type: 'radar',
      data: dataRadar,
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        elements: {
          line: {
            borderWidth: 3
          }
        }
      }
    })

    const measureChartsLine = new Chart(ctxLine, {
      type: 'line',
      data: dataLine,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })

    return function cleanup() {
      measureChartsRadar.destroy()
      measureChartsLine.destroy()
    }
  })

  return (
    <section className="card" style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '550px' }}>
        <canvas id="measureChartRadar" ref={canvasRadar} style={{ maxHeight: '518px' }} />
      </div>
      <div style={{ width: '100%', maxWidth: 'calc(100% - 550px)' }}>
        <canvas id="measureChartLine" ref={canvasLine} style={{ maxHeight: '518px' }} />
      </div>
    </section>
  )
}
