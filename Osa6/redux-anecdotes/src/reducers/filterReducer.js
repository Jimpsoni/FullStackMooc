import { createSlice } from '@reduxjs/toolkit'

const filterInitial = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitial,
  reducers: {
    changeFilter( state, filter ) {
        return filter
    }
  },
})


export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer
