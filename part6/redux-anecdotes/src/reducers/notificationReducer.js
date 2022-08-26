import { createSlice } from "@reduxjs/toolkit"

const initialState = 'Temporary!'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify: (state, action) => {
      return action.payload
    },
    resetNotification: () => {
      return ''
    }
  }
})

export const { notify, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer