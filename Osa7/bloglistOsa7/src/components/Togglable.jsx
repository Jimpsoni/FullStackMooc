import { useState, useImperativeHandle, forwardRef } from "react"
import { Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { 
    display: visible ? "none" : "",
    marginBottom: 17,
    marginTop: 17
  
  }
  const showWhenVisible = { 
    display: visible ? "" : "none",
    margin: 50
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

export default Togglable
