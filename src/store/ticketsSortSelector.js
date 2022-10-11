import { createSelector } from '@reduxjs/toolkit'

export const allTickets = (state) => state.tickets.tickets.tickets
export const filterList = (state) => state.filters.filters
export const sortSelect = (state) => state.sorting.sorting

export const ticketsSortFilter = createSelector([allTickets, filterList, sortSelect], (tickets, filters, sort) => {
  let result = []

  if (filters['non-stop']) {
    result = [...result, ...[...tickets].filter((item) => item.segments.every((segment) => segment.stops.length === 0))]
  }
  if (filters['one-transfer']) {
    result = [...result, ...[...tickets].filter((item) => item.segments.every((segment) => segment.stops.length === 1))]
  }
  if (filters['two-transfer']) {
    result = [...result, ...[...tickets].filter((item) => item.segments.every((segment) => segment.stops.length === 2))]
  }
  if (filters['three-transfer']) {
    result = [...result, ...[...tickets].filter((item) => item.segments.every((segment) => segment.stops.length === 3))]
  }
  if (filters.all) result = [...tickets]

  if (sort.cheapset) result = result.sort((first, second) => first.price - second.price)
  if (sort.optimal) {
    result = result.sort(
      (first, second) =>
        first.price +
        first.segments.reduce((time, fly) => time + fly.duration, 0) -
        (second.price + second.segments.reduce((time, fly) => time + fly.duration, 0))
    )
  }
  if (sort.fastest) {
    result = result.sort(
      (first, second) =>
        first.segments.reduce((time, fly) => time + fly.duration, 0) -
        second.segments.reduce((time, fly) => time + fly.duration, 0)
    )
  }
  return result
})
