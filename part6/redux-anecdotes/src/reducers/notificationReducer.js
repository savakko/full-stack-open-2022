import { createSlice } from "@reduxjs/toolkit"

// This could be modularized to some timeOut helper utility --->
let notificationId = undefined

const clearNotificationTimeout = () => {
  clearTimeout(notificationId)
  notificationId = undefined
}

const setUniqueTimeout = (operation, duration) => {
  if (notificationId)
    clearNotificationTimeout()

  notificationId = setTimeout(() => {
    operation()
    clearNotificationTimeout()
  }, duration)
}
// <---

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
    resetNotification: () => {
      return ''
    }
  }
})

export const { setNotification, resetNotification } = notificationSlice.actions

export const notify = (message, duration = 5000) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setUniqueTimeout(() => dispatch(resetNotification()), duration)
  }
}

export default notificationSlice.reducer