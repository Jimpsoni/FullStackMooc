import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
    axios.get(baseUrl).then(res => res.data)

export const createNewAnecdote = newAnecdote => {
    const data = {
        content: newAnecdote.content,
        votes: 0
    }

    return axios.post(baseUrl, data).then(res => res.data)
}

export const voteForAnecdote = anecdote => {
    const id = anecdote.id
    const data = {
        ...anecdote,
        votes: anecdote.votes + 1
    }

    return axios.put(baseUrl + `/${id}`, data).then(res => res.data)
}