import { createSlice } from '@reduxjs/toolkit'

const sortSlice = createSlice({
  name: 'sorting',
  initialState: {
    sorting: {
      cheapset: true,
      fastest: false,
      optimal: false,
    },
  },
  reducers: {
    onToggleSort(state, action) {
      const { value } = action.payload
      const newSortingFalse = Object.fromEntries(Object.entries({ ...state.sorting }).map((item) => [item[0], false]))
      state.sorting = newSortingFalse
      state.sorting[value] = true
    },
  },
})

export const { onToggleSort } = sortSlice.actions

export default sortSlice.reducer
