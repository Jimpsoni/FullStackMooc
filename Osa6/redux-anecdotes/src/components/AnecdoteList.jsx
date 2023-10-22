import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
  
    // Logic
    const vote = (id) => dispatch(voteAnecdote(id))
    const sortingFunc = (a, b) =>  b.votes - a.votes 
  
    return (
      <>
        {anecdotes.sort(sortingFunc).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </>
    )
}

export default AnecdoteList