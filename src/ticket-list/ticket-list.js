import { Col, Row, Button, Alert, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux'

import Ticket from '../ticket/ticket'
import { fetchId, fetchTickets } from '../store/ticketSlice'
import { ticketsSortFilter } from '../store/ticketsSortSelector'

import styles from './ticket-list.module.scss'

export default function TicketList() {
  const statusTickets = useSelector((state) => state.tickets.tickets)
  const tickets = useSelector(ticketsSortFilter)

  const [countTickets, setCountTickets] = useState(5)

  const dispatch = useDispatch()

  useEffect(() => {
    setCountTickets(5)
  }, [])

  useEffect(() => {
    const asyncFn = async () => {
      const response = await dispatch(fetchId())
      const id = response.payload
      dispatch(fetchTickets(id))
    }
    asyncFn()
  }, [dispatch])

  const elements = tickets
    .filter((item, index) => index < countTickets)
    .map((item) => {
      const key = nanoid(8)
      return (
        <Col span={24} key={key}>
          <Ticket ticket={item} />
        </Col>
      )
    })

  const onClickGo = () => setCountTickets((count) => count + 5)

  const boolTickets = !tickets.length

  return (
    <Row className={styles['ticket-list']} gutter={[0, 24]}>
      {statusTickets.errorMessage.length !== 0 && statusTickets.errorMessage !== '500 Server' ? (
        <Alert className={styles['ticket-list__alert']} type="error" message={statusTickets.errorMessage} />
      ) : null}
      {statusTickets.loading ? <Spin className={styles['ticket-list__spinner']} size="large" /> : null}
      {!boolTickets ? null : (
        <Alert
          className={styles['ticket-list__alert']}
          type="info"
          message="Билетов по заданным критериям не найдено"
        />
      )}
      {elements}
      <Button className={styles['ticket-list__button-go']} type="primary" disabled={boolTickets} onClick={onClickGo}>
        Показать ещё 5 билетов!
      </Button>
    </Row>
  )
}
