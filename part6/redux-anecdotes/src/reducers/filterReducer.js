import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      return action.payload
    },
    resetFilter: () => {
      return ''
    }
  }
})

export const { updateFilter, resetFilter } = filterSlice.actions
export default filterSlice.reducer