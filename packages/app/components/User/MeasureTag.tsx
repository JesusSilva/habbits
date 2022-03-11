import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function MeasureTag(props) {
  return (
    <>
      {props.site === 'right' ? (
        <TagRight style={{ top: props.top, left: props.left }}>
          <span>{props.measure}</span>
        </TagRight>
      ) : (
        <TagLeft style={{ top: props.top, left: props.left }}>
          <span>{props.measure}</span>
        </TagLeft>
      )}
    </>
  )
}

MeasureTag.propTypes = {
  measure: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  site: PropTypes.string
}

const TagRight = styled.div`
  height: 24px;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #202b45;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-weight: 400;
  font-weight: 200;
  position: absolute;
  top: 30px;
  right: 180px;
  &::after {
    content: '';
    background: #202b45;
    width: 8px;
    height: 8px;
    right: 20px;
    position: absolute;
    left: -4px;
    transform: rotate(-45deg);
  }
`

const TagLeft = styled.div`
  height: 24px;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #202b45;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-weight: 400;
  font-weight: 200;
  position: absolute;
  top: 30px;
  right: 180px;
  &::after {
    content: '';
    background: #202b45;
    width: 8px;
    height: 8px;
    right: 20px;
    position: absolute;
    left: 44px;
    transform: rotate(-45deg);
  }
`
