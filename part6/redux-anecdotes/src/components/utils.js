import { resetNotification, setNotification } from "../reducers/notificationReducer";

const notify = (dispatchOperation, message) => {
  dispatchOperation(setNotification(message))
  setTimeout(() => dispatchOperation(resetNotification()), 5000)
}

export { notify }
