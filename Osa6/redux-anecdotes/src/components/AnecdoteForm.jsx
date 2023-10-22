import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNew = ( event ) => {
      event.preventDefault()
      const text = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(addNewAnecdote( text ))
    }
  
    return (
      <>
        <h2>create new</h2>
        <form onSubmit={addNew}>
            <div><input name='anecdote' /></div>
            <button>create</button>
        </form>
      </>
    )
  }

export default AnecdoteForm