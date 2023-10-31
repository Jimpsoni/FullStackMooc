import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const initialState = []

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, blogs) {
      return blogs.payload
    },

    addNewBlog(state, blog) {
      return state.concat(blog.payload)
    },

    removeBlog(state, blog) {
      return state.filter((b) => b.id !== blog.payload)
    },

    updateBlog(state, blog) {
      return state.map((b) => {
        const blogID = blog.payload.id
        if (b.id === blogID) {
          return blog.payload
        }
        return b
      })
    },
  },
})

export const { setBlogs, addNewBlog, removeBlog, updateBlog } = blogSlice.actions

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(addNewBlog(newBlog.data))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    blogService.remove(blog.id)
    dispatch(removeBlog(blog.id))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newData = {
      ...blog,
      likes: blog.likes + 1,
    }
    blogService.update(blog.id, newData)
    dispatch(updateBlog(newData))
  }
}


export default blogSlice.reducer
