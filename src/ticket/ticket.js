import React from 'react'

import TicketInfo from '../ticket-info'

import styles from './ticket.module.scss'

const getPrice = (text, n) => `${text.slice(0, n - 3)} ${text.slice(n - 3)} Р`

export default function Ticket({ ticket }) {
  const { price, carrier, segments } = ticket
  const ticketThere = segments[0]
  const ticketBack = segments[1]
  return (
    <div className={styles.ticket}>
      <h3 className={styles.ticket__price}>{getPrice(price.toString(), price.toString().length)}</h3>
      <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="logo_company" className={styles.ticket__logo} />
      <TicketInfo info={ticketThere} />
      <TicketInfo info={ticketBack} />
    </div>
  )
}
