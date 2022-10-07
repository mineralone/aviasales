import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './filtersSlice'
import sortSlice from './sortSlice'
import ticketSlice from './ticketSlice'

export default configureStore({
  reducer: {
    filters: filterReducer,
    sorting: sortSlice,
    tickets: ticketSlice,
  },
})
