import React from 'react'
import { Radio } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { onToggleSort } from '../store/sortSlice'

import styles from './ticket-tabs.module.scss'

export default function TicketTabs() {
  const statusSort = useSelector((state) => state.sorting.sorting)

  const defaultValue = Object.entries(statusSort)
    .filter((item) => item[1])
    .map((item) => item[0])
    .join('')

  const dispatch = useDispatch()
  const options = [
    {
      label: 'Самый дешёвый',
      value: 'cheapset',
    },
    {
      label: 'Самый быстрый',
      value: 'fastest',
    },
    {
      label: 'Оптимальный',
      value: 'optimal',
    },
  ]
  const onChange = (e) => {
    const { value } = e.target
    dispatch(onToggleSort({ value }))
  }

  return (
    <section className={styles['tickets-tabs']}>
      <Radio.Group
        className={styles['tickets-tabs__group']}
        defaultValue={defaultValue}
        options={options}
        optionType="button"
        buttonStyle="solid"
        onChange={onChange}
      />
    </section>
  )
}
