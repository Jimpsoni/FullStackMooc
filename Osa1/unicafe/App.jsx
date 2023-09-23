import { useState } from 'react'

const Header = (props) => { return <h1>{props.text}</h1> }
const Button = (props) => { return <button onClick={props.handleClick}>{props.text}</button>}
const Info = (props) => {return <div>{props.text} {props.value}</div>}
const InfoPercentage = (props) => {return <div>{props.text} {props.value}%</div>}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)
  

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedTotal = bad + updatedGood + neutral
    setGood(updatedGood)
    setTotal(updatedTotal)
    calculateAverage(updatedGood, bad, updatedTotal)
    calculatePositive(updatedGood, updatedTotal)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = bad + good + updatedNeutral
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    calculateAverage(good, bad, updatedTotal)
    calculatePositive(good, updatedTotal)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedTotal = updatedBad + good + neutral
    setBad(updatedBad)
    setTotal(updatedTotal)
    calculateAverage(good, updatedBad, updatedTotal)
    calculatePositive(good, updatedTotal)
  }

  const calculateAverage = (good1, bad1, total1) => { 
    setAvg( (bad1 * (-1) + good1) / total1 )
  }

  const calculatePositive = (good, total) => {
    setPos( good / total * 100)
  }



  return (
    <div>
      <Header text="give feedback"/>

      <Button text="good" handleClick={handleGoodClick}/>
      <Button text="neutral" handleClick={handleNeutralClick}/>
      <Button text="bad" handleClick={handleBadClick}/>
      
      <Header text="statistics"/>

      <Info text="good" value={good}/> 
      <Info text="neutral" value={neutral}/> 
      <Info text="bad" value={bad}/>

      <Info text="all" value={total}/>
      <Info text="average" value={avg}/>
      <InfoPercentage text="positive" value={pos}/>
    </div>
  )
}

export default App

