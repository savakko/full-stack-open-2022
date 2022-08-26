import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      return state.concat(asObject(action.payload))
    },
    voteAnecdote(state, action) {
      return state.map(a =>
        a.id === action.payload
          ? { ...a, votes: a.votes + 1 }
          : a
      )
    },
    appendAnecdote(state, action) {
      return state.concat(asObject(action.payload))
    },
    setAnecdotes(state, action) {
      return action.payload.map(a => asObject(a))
    }
  }
})

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer