import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notify } from "./utils"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()

    const input = event.target.anecdote
    const anecdote = input.value
    input.value = ''

    dispatch(createAnecdote(anecdote))
    notify(dispatch, `You created: '${anecdote}'`)
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
