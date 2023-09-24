import { useState } from 'react'

const Header = (props) => { return <h1>{props.text}</h1> }
const Button = (props) => { return <button onClick={props.handleClick}>{props.text}</button>}
const StatisticLine  = (props) => {return <div>{props.text} {props.value}</div>}

const Statistics = (props) => {
  if (props.good + props.bad + props.neutral === 0) {
    <Header text="statistics"/>
    return <p>No feedback given</p>
  }
  
  return (
    <div>
      <Header text="statistics"/>

      <StatisticLine text="good" value={props.good}/> 
      <StatisticLine text="neutral" value={props.neutral}/> 
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="all" value={props.good + props.bad + props.neutral}/>
      <StatisticLine text="average" value={((-1) * props.bad + props.good) / (props.bad + props.neutral + props. good)}/>
      <StatisticLine text="Positive" value={props.good / (props.good + props.bad + props. neutral) * 100 + "%"}/>

    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  const handleClick = (num) => {
    if (num === 1) setGood(good + 1)
    if (num === 0) setNeutral(neutral + 1)
    if (num === -1) setBad(bad + 1)
  }


  return (
    <div>
      <Header text="give feedback"/>

      <Button text="good" handleClick={() => handleClick(1)}/>
      <Button text="neutral" handleClick={() => handleClick(0)}/>
      <Button text="bad" handleClick={() => handleClick(-1)}/>
      
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
