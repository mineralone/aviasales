import React from 'react'
import 'antd/dist/antd.css'

import TicketList from '../ticket-list'
import TicketTabs from '../tickect-tabs'
import FiltersTransfers from '../filters-transfers'

import styles from './aviasales-app.module.scss'
import logo from './logo.svg'

export default function AviasalesApp() {
  return (
    <section className={styles.app}>
      <img className={styles.app__logo} src={logo} alt="logo" />
      <section className={styles.app__page}>
        <FiltersTransfers />
        <main className={styles.app__content}>
          <TicketTabs />
          <TicketList />
        </main>
      </section>
    </section>
  )
}
