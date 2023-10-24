import AnecdoteForm from './components/AnecdoteForm'

import Notification from './components/Notification'
import { useNotificationDispatch } from './components/createContext'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteForAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteVote = useMutation({
    mutationFn: voteForAnecdote,
    onSuccess: (anecdote) => {
      getAnecdotes().then(res => console.log(res))
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setTimeout(() => 
        {dispatch({type: 'CLEAR_MESSAGE'})},
        5000
      )
      dispatch({type: 'SET_MESSAGE', payload:`Voted for "${anecdote.content}"`})
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  console.log(JSON.parse(JSON.stringify(result)))

  const anecdotes = result.data


  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const handleVote = ( anecdote ) => {
    newAnecdoteVote.mutate(anecdote)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
