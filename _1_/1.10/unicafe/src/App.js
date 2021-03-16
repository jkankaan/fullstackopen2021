import React, { useState } from 'react'

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  if ((good + neutral + bad) > 0){
  return (
  <div>
    <h1>statistics</h1>
    <StatisticLine text="good" value={good}></StatisticLine>
    <StatisticLine text="neutral" value={neutral}></StatisticLine>
    <StatisticLine text="bad" value={bad}></StatisticLine>
    <StatisticLine text="all" value={good+neutral+bad}></StatisticLine>
    <StatisticLine text="average" value={(good*1+neutral*0+bad*-1)/(good+neutral+bad)}></StatisticLine>
    <StatisticLine text="positive" value={(good)/(good+neutral+bad)*100} percent="%"></StatisticLine>
  </div>
  )
  }
  else {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
}

const StatisticLine = (props) => {
  return (
    <div>
    {props.text} {props.value} {props.percent}
    </div>
  )
}

const Button = (props) => {
  return (
      <button onClick={() =>props.set(props.value+1)}>{props.text}</button>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button set={setGood} value={good} text="good"></Button>
      <Button set={setNeutral} value={neutral} text="neutral"></Button>
      <Button set={setBad} value={bad} text="bad"></Button>
      <Statistics good ={good} neutral = {neutral} bad = {bad}></Statistics>
    </div>
  )
}

export default App