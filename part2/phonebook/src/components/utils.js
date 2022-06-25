const Notification = ({ notification }) => 
  <div className={notification.style}>{notification.message}</div>

export { Notification }