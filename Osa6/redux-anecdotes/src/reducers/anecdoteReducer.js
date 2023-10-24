import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../../services/anecdotes'

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
 */

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
    addNew( state, action ) {
      state.push(action.payload)
    },

    giveVote( state, id ) {
      Object.values(state).forEach(elem => {
        if (elem.id === id.payload) {
          elem.votes = elem.votes + 1
        }
      })
    },

    setAnecdotes( state, action ) {
      return action.payload
    }
  },
})


export const { addNew, giveVote, setAnecdotes } = anecdoteSlice.actions


export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNew = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addNew(newAnecdote))
  } 
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const data = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const newData = await anecdoteService.update( data )

    dispatch(giveVote(newData.id))
  }

}

export default anecdoteSlice.reducer
