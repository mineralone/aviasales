import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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

export const fetchTickets = createAsyncThunk('ticketSlice/fetchTickets', async (id, { dispatch, getState }) => {
  const api = new API()
  let stop = false
  while (!stop && getState().tickets.failedAttempts < 6) {
    try {
      if (getState().tickets.failedAttempts >= 4) {
        dispatch(throwError('Problems with connection, try reloading the page'))
        return
      }
      if (id === undefined) return
      const response = await api.getTickets(id)
      stop = response.stop
      const { tickets } = response
      dispatch(addTickects({ tickets }))
    } catch (e) {
      dispatch(addFailedCount())
      dispatch(throwError(e.message))
    }
  }
})

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    requestResolution: true,
    searchId: '',
    failedAttempts: 0,
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
    addFailedCount(state) {
      state.failedAttempts += 1
    },
  },
  extraReducers: {
    [fetchTickets.pending]: (state) => {
      state.tickets.loading = true
    },
    [fetchTickets.fulfilled]: (state) => {
      state.tickets.loading = false
    },
  },
})

export const { setSearchId, addTickects, throwError, setRequestResolution, addFailedCount } = ticketSlice.actions

export default ticketSlice.reducer
