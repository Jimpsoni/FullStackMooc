import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { changeFilter } from '../reducers/filterReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)

  const filterFunc = ( item ) => {
    if (!filter) return item
    if (item.content.toLowerCase().includes(filter.payload.toLowerCase())) {
      return item
    }
    return
  }

  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(filterFunc)
  })
  
  const vote = ( anecdote ) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`Voted anecdote "${anecdote.content}"`, 4))
  }
  
  const sortingFunc = ( a, b ) =>  b.votes - a.votes
  
  return (
    <>
      {anecdotes.filter(filterFunc).sort(sortingFunc).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList