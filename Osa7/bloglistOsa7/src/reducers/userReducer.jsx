import { createSlice } from '@reduxjs/toolkit'


const initialState = null

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken(state, token) {
            return token.payload
        },
        removeToken(state) {
            return null
        }
    }
})

export const { setToken, removeToken } = userSlice.actions

export const giveToken = (user) => {
  return (dispatch) => {
    dispatch(setToken(user))
  }
}



export default userSlice.reducer
