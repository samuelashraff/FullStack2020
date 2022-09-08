import {useState} from 'react'

const generateRandomInteger = (max) => {
  return Math.floor(Math.random() * max) + 1;
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

  const points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
  const copy = {...points}
   
  const [selected, setSelected] = useState(0)

  return (
    <div>
      {anecdotes[selected]}
      <br/>
      has {copy[selected]} votes
      <br/>
      <button onClick={() => copy[selected] += 1}>vote</button>
      <button onClick={() => setSelected(generateRandomInteger(7))}>next anecdote</button>
    </div>
  )
}

export default App
