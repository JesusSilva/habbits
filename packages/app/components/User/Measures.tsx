import MeasureTag from './MeasureTag'

interface Measures {
  measures: {
    height: number
    breast: number
    arm: number
    waist: number
    hip: number
    legs: number
    weight: number
  }
}

export default function MeasuresComponent(props: Measures) {
  return (
    <>
      <section className="measures">
        <img src="../images/measure/body.png" alt="Body svg" />
        <MeasureTag measure={props.measures.height} top={15} left={180} site={'right'} />
        <MeasureTag measure={props.measures.breast} top={140} left={50} site={'left'} />
        <MeasureTag measure={props.measures.arm} top={150} left={225} site={'right'} />
        <MeasureTag measure={props.measures.waist} top={200} left={55} site={'left'} />
        <MeasureTag measure={props.measures.hip} top={240} left={195} site={'right'} />
        <MeasureTag measure={props.measures.legs} top={300} left={200} site={'right'} />

        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <span>Peso: {props.measures.weight}Kg</span>
        </div>
      </section>
    </>
  )
}
