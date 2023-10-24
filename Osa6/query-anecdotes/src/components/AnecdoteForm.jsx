import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNewAnecdote } from '../requests'
import { useNotificationDispatch } from './createContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setTimeout(() => 
        {dispatch({type: 'CLEAR_MESSAGE'})},
        5000
      )
      dispatch({type: 'SET_MESSAGE', payload:`Added new anecdote "${anecdote.content}"`})
    },
    onError: (error) => {
      if (error.response.status) {
        setTimeout(() => 
          {dispatch({type: 'CLEAR_MESSAGE'})},
          5000
        )
        dispatch({type: 'SET_MESSAGE', payload:`Too short, anecdote must be atleast 5 characters`})
      }
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({ content })

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
