import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    const input = event.target.anecdote
    dispatch(addAnecdote(input.value))
    input.value = ''
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={add}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
