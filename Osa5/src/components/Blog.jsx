import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, username,  removeBlog }) => {
  const [buttonLabel, setButtonLabel] = useState('View')
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const isOwner = (blog.user.username === username)

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    removeBlog: PropTypes.func.isRequired
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginTop: 15
  }

  const handleShow = () => {
    setVisible(!visible)
    if (visible) setButtonLabel('View')
    else setButtonLabel('Hide')
  }

  const handleLike = () => {
    blog.likes += 1
    blogService.update(blog.id, blog)
      .then(setLikes(likes + 1))
      .catch(error => console.log(error))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        blogService.remove(blog.id)
        removeBlog(blog)
      } catch (e) {
        console.log(`Error occured ${e}`)
      }
    }
  }

  return (
    <div style={blogStyle} className='blogItem'>
      <div>
        {blog.title} {blog.author}<button className='showBlog' onClick={handleShow}>{buttonLabel}</button>
      </div>
      <div data-testid="moreInfo" style={showWhenVisible}>
        <div>{blog.url}</div>
        <div className='likeCount'> {blog.likes} <button className='likeBlog' onClick={handleLike}>Like</button> </div>
        <div>{blog.user.name}</div>
        {isOwner && <button className='removeBlog' onClick={handleRemove}>Remove</button>}
      </div>
    </div>
  )
}

export default Blog