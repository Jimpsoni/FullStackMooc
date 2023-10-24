import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "SET_MESSAGE":
          return state = action.payload
      case "CLEAR_MESSAGE":
          return state = null
      default:
          return state
    }
  }

const NotificationContext = createContext()

export const NotificationContextProvider = props => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}


export const useNotificationValue = () => { 
    return useContext(NotificationContext)[0] 
}
export const useNotificationDispatch = message => {
    return useContext(NotificationContext)[1]
}

export default NotificationContext