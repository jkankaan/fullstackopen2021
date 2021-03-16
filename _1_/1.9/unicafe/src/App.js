import React, { useState } from 'react'

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  if ((good + neutral + bad) > 0){
  return (
  <div>
    <h1>statistics</h1>
    good {good}<br></br>
    neutral {neutral}<br></br>
    bad {bad}<br></br>
    all {good+neutral+bad}<br></br>
    average {(good*1+neutral*0+bad*-1)/(good+neutral+bad)}<br></br>
    positive {(good)/(good+neutral+bad)*100} %
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

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good+1)}>good</button>
      <button onClick={() => setNeutral(neutral+1)}>neutral</button>
      <button onClick={() => setBad(bad+1)}>bad</button>
      <Statistics good ={good} neutral = {neutral} bad = {bad}></Statistics>
    </div>
  )
}

export default App