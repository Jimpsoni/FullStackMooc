import { useState } from 'react'


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0})
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)

  const handleClick = () => {
    const max = anecdotes.length
    const index = Math.floor(Math.random() * max)
    setSelected(index)
  }

  const handleVoting = () => {
    const copy = {...votes}
    copy[selected] += 1
    setVotes(copy)

    if (copy[selected] > copy[mostVoted]) setMostVoted(selected)

  }
  
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>
        {anecdotes[selected]}
        <div>has {votes[selected]} votes</div>
        <button onClick={handleVoting}>vote</button>
        <button onClick={handleClick}>next anecdote</button>
      </div>

      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[mostVoted]}</div>
      <div>has {votes[mostVoted]} votes</div>

    </div>
  )
}

export default App
