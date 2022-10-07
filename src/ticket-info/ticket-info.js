import { Col, Row } from 'antd'
import React from 'react'

import styles from './ticket-info.module.scss'

const getText = (array) => {
  if (array.length === 0) return 'Без пересадок'
  if (array.length === 1) return '1 пересадка'
  return `${array.length} пересадки`
}

const getTimeTransfer = (min) => {
  const newMin = min % 60
  return `${(min - newMin) / 60}ч ${newMin}м`
}

const formatDate = (stringDate) => {
  const date = new Date(stringDate)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  hours = hours.toString().length > 1 ? hours.toString() : `0${hours}`
  minutes = minutes.toString().length > 1 ? minutes.toString() : `0${minutes}`
  return `${hours}:${minutes}`
}

export default function TicketInfo(props) {
  const { info } = props
  return (
    <Row className={styles.info}>
      <Col span={8}>
        <p className={styles.info__title}>{`${info.origin} - ${info.destination}`}</p>
        <p>{`${formatDate(info.date)} - ${formatDate(new Date(info.date).getTime() + info.duration * 60000)}`}</p>
      </Col>
      <Col span={7} offset={1}>
        <p className={styles.info__title}>В пути</p>
        <p>{getTimeTransfer(info.duration)}</p>
      </Col>
      <Col span={7} offset={1}>
        <p className={styles.info__title}>{getText(info.stops)}</p>
        <p>{info.stops.join(' ')}</p>
      </Col>
    </Row>
  )
}
