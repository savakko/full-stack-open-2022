import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from './utils'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    notify(dispatch, `You voted: '${anecdote.content}'`)
  }

  return (
    <div>
      {[ ...anecdotes ]
        .sort((a1, a2) => a2.votes - a1.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList
