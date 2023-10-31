import PropTypes from "prop-types"
import { useState } from "react"
import { ListGroup, Button } from "react-bootstrap"

// Redux logix
import { setNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { deleteBlog, likeBlog } from "../reducers/blogReducer"
import blogService from "../services/blogs"

const Blog = ({ blog }) => {
  if (blog === undefined)
    return <h2>Could not find the blog you were looking for :/</h2>

  const dispatch = useDispatch()
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState(blog.comments)

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(setNotification(`Deleted ${blog.title} by ${blog.author}`))
        dispatch(deleteBlog(blog))
      } catch (e) {
        console.log(`Error occured ${e}`)
      }
    }
  }

  const submitComment = async (event) => {
    event.preventDefault()
    const newComments = await blogService.updateComments(
      blog.id,
      comments.concat(comment)
    )
    console.log(newComments.data.comments)
    setComments(newComments.data.comments)
    setComment("")
  }

  const isOwner = blog.user.username === "Jimi"

  return (
    <div className="blogItem">
      <div>
        <h1>
          {blog.title} {blog.author}
        </h1>
      </div>
      <div>
        <ListGroup style={{marginBottom:10, marginTop:15}}>
          <ListGroup.Item variant="dark" >{blog.url}</ListGroup.Item>
          <ListGroup.Item className="likeCount">
            {" "}
            {blog.likes}
            {" Likes"}
            <Button className="likeBlog" onClick={handleLike}>
              Like
            </Button>{" "}
          </ListGroup.Item>
          <ListGroup.Item variant="dark" >Added by {blog.user.name}</ListGroup.Item>
        </ListGroup>

        {isOwner && (
          <Button className="removeBlog" onClick={handleRemove}>
            Remove
          </Button>
        )}

        <h2>Comments:</h2>
        <ul>
          {comments.map((comment) => {
            return <li key={comment}>{comment}</li>
          })}
        </ul>

        <form onSubmit={submitComment}>
          <input
            type="text"
            value={comment}
            placeholder="Your comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <button type="submit">add a comment</button>
        </form>

      </div>
    </div>
  )
}

export default Blog
