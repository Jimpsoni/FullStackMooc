import { useState } from 'react'

const Header = (props) => { return <h1>{props.text}</h1> }
const Button = (props) => { return <button onClick={props.handleClick}>{props.text}</button>}
const Info = (props) => {return <div>{props.text} {props.value}</div>}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback"/>

      <Button text="good" handleClick={() => setGood(good + 1)}/>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" handleClick={() => setBad(bad + 1)}/>
      
      <Header text="statistics"/>

      <Info text="good" value={good}/> 
      <Info text="neutral" value={neutral}/> 
      <Info text="bad" value={bad}/>
    </div>
  )
}

export default App
