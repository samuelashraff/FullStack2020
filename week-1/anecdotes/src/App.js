import {useState} from 'react'

const generateRandomInteger = (max) => {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const points = [0, 0, 0, 0, 0, 0, 0]

  const [selected, setSelected] = useState(0)
  const [point, setPoint] = useState(points)

  

  const VoteClick = () => {
    const copy = [...point]
    copy[selected] += 1
    setPoint(copy)
  }

  const mostVoted = anecdotes[point.indexOf(Math.max(...point))]  // Find anecdote with most votes

  return (
    <div>
      <h1><b>Anecdote of the day</b></h1>
      {anecdotes[selected]}
      <br/>
      has {point[selected]} votes
      <br/>
      <button onClick={VoteClick}>vote</button>
      <button onClick={() => setSelected(generateRandomInteger(7))}>next anecdote</button>
      <h1><b>Anecdote with most votes</b></h1>
      <p>{mostVoted}</p>
    </div>
  )
}

export default App
