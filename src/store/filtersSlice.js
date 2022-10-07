import { createSlice } from '@reduxjs/toolkit'

const objEntriesFrom = (obj, flag) => Object.fromEntries(Object.entries({ ...obj }).map((item) => [item[0], flag]))

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filters: {
      all: false,
      'non-stop': true,
      'one-transfer': false,
      'two-transfer': false,
      'three-transfer': false,
    },
  },
  reducers: {
    onToggleFilter(state, action) {
      const { value } = action.payload
      const { filters } = state
      if (value === 'all' && !filters.all) {
        const newFilters = objEntriesFrom(filters, true)
        state.filters = newFilters
      }
      if (value === 'all' && filters.all) {
        const newFilters = objEntriesFrom(filters, false)
        state.filters = newFilters
      }
      filters[value] = !filters[value]
      const amountElementsTrue = Object.entries({ ...filters }).filter((item) => item[1]).length
      const amountElements = Object.keys({ ...filters }).length
      if (amountElementsTrue !== amountElements && filters.all) {
        filters.all = false
      } else if (amountElementsTrue === amountElements - 1) {
        filters.all = true
      }
    },
  },
})

export const { onToggleFilter } = filtersSlice.actions

export default filtersSlice.reducer
