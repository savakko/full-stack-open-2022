import { useState } from 'react'

const DisplayAnecdote = ({ text, votes }) => <p>{text}<br/>has {votes} votes</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(0)
  const [points, setPoints] = useState(anecdotes.map(() => 0))

  const updateSelected = () => {
    const index = Math.floor(Math.random() * anecdotes.length)
    setSelected(index)
  }
  const updatePoints = () => {
    const updated = [ ...points ]
    updated[selected] += 1
    const maxIndex = updated.indexOf( Math.max(...updated) )

    setPoints(updated)
    setVoted(maxIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote text={anecdotes[selected]} votes={points[selected]} />
      <button onClick={updatePoints}>vote</button>
      <button onClick={updateSelected}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <DisplayAnecdote text={anecdotes[voted]} votes={points[voted]} />
    </div>
  );
}

export default App;
