import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, message) {
      return message
    },

    clearMessage(state) {
      return null
    },
  },
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (message, timeShown = 5) => {
  return (dispatch) => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(clearMessage())
    }, timeShown * 1000)
  }
}

export default notificationSlice.reducer
