import { useSelector } from "react-redux"

import Blog from "./Blog"

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <>
      {blogs.map((blog) => {
        return (
          <Blog
            key={blog.id}
            blog={blog}
            username={user.username}
          />
        )
      })}
    </>
  )
}

export default BlogList
