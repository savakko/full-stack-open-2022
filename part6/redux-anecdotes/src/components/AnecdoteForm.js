import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import anecdoteService from "../services/anecdotes"
import { notify } from "./utils"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const value = event.target.anecdote.value
    event.target.anecdote.value = ''

    const anecdote = await anecdoteService.createNew(value)
    dispatch(createAnecdote(anecdote))
    notify(dispatch, `You created: '${anecdote.content}'`)
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
