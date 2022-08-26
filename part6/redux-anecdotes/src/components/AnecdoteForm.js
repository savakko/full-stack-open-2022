import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notify } from "./utils"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()

    const value = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createAnecdote(value))
    notify(dispatch, `You created: '${value}'`)
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
