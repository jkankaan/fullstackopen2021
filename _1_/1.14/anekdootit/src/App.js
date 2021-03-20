import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(new Array(anecdotes.length).fill(0))

    const setVote = () => {
      const copy = [...voted]
      copy[selected] += 1
      setVoted(copy)
    }
    
    const setRandom = () => Math.floor(Math.random() * anecdotes.length)

    const findMostvotes = () => {
      let most = 0
      let index = 0
      for (let i = 0; i < anecdotes.length; i++) {
        if (voted[i] > most) {
          most = voted[i]
          index = i
        } 
      }
      return index
    }
    
    
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}<br></br>
      has {voted[selected]} votes<br/>
      <button onClick={() => setVote()}>vote</button>
      <button onClick={() => setSelected(setRandom())}>
      next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {anecdotes[findMostvotes()]}<br/>
      has {voted[findMostvotes()]} votes
    </div>
  )
}

export default App