import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

import API from '../API'

export const fetchId = createAsyncThunk('ticketSlice/fetchId', async (_, { dispatch, getState }) => {
  const api = new API()
  if (getState().tickets.requestResolution) {
    dispatch(setRequestResolution())
    try {
      const responseId = await api.getSearchId()
      const id = responseId.searchId
      dispatch(setSearchId(id))
      return id
    } catch (e) {
      dispatch(throwError(e.message))
    }
  }
  return getState().searchId
})

export const fetchTickets = createAsyncThunk('ticketSlice/fetchTickets', async (id, { dispatch }) => {
  const api = new API()
  let stop = false
  while (!stop) {
    try {
      if (id === undefined) return
      const response = await api.getTickets(id)
      stop = response.stop
      const { tickets } = response
      dispatch(addTickects({ tickets }))
    } catch (e) {
      dispatch(throwError(e.message))
    }
  }
})

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    requestResolution: true,
    searchId: '',
    tickets: {
      loading: false,
      errorMessage: '',
      tickets: [],
    },
  },
  reducers: {
    setSearchId(state, action) {
      state.searchId = state.searchId ? state.searchId : action.payload
    },
    addTickects(state, action) {
      state.tickets.tickets = [...state.tickets.tickets, ...action.payload.tickets]
    },
    throwError(state, action) {
      state.tickets.errorMessage = action.payload
    },
    setRequestResolution(state) {
      state.requestResolution = false
    },
  },
  extraReducers: {
    [fetchTickets.pending]: (state) => {
      state.tickets.loading = true
    },
    [fetchTickets.fulfilled]: (state) => {
      state.tickets.loading = false
      state.tickets.errorMessage =
        state.tickets.errorMessage === 'Перезагрузите страницу!' ? state.tickets.errorMessage : ''
    },
  },
})

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

export const { setSearchId, addTickects, throwError, setRequestResolution } = ticketSlice.actions

export default ticketSlice.reducer
