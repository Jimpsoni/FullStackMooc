import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNew = ( event ) => {
      event.preventDefault()
      const text = event.target.anecdote.value
      event.target.anecdote.value = ''
      
      dispatch(createNew( text ))
      dispatch(setNotification(`Created new anecdote "${text}"`))
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