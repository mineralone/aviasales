import React, { useEffect } from 'react'
import 'antd/dist/antd.min.css'
import { useDispatch } from 'react-redux'

import TicketList from '../ticket-list'
import TicketTabs from '../tickect-tabs'
import FiltersTransfers from '../filters-transfers'
import { throwError } from '../store/ticketSlice'

import styles from './aviasales-app.module.scss'
import logo from './logo.svg'

export default function AviasalesApp() {
  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener('offline', () => dispatch(throwError('Problems with connection, try reloading the page')))
  }, [dispatch])

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
