import React from 'react'
import { Checkbox } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'

import { onToggleFilter } from '../store/filtersSlice'

import styles from './filters-transfers.module.scss'

export default function FiltersTransfers() {
  const dispatch = useDispatch()
  const statusObj = useSelector((state) => state.filters.filters)

  const onChange = (e) => {
    const { value } = e.target
    dispatch(onToggleFilter({ value }))
  }

  const options = [
    { label: 'Все', value: 'all', id: nanoid(8) },
    { label: 'Без пересадок', value: 'non-stop', id: nanoid(8) },
    { label: '1 пересадка', value: 'one-transfer', id: nanoid(8) },
    { label: '2 пересадки', value: 'two-transfer', id: nanoid(8) },
    { label: '3 пересадка', value: 'three-transfer', id: nanoid(8) },
  ]

  const filters = () => {
    return options.map((item) => {
      return (
        <Checkbox value={item.value} onChange={onChange} checked={statusObj[item.value]} key={item.id}>
          {item.label}
        </Checkbox>
      )
    })
  }

  return (
    <section className={styles.filters}>
      <h2 className={styles.filters__title}>Количество пересадок</h2>
      <div className={styles['filters__checkbox-group']}>{filters()}</div>
    </section>
  )
}
