import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const LinkToBlog = ({ blog }) => {
    return (
      <div>
        <Link to={`blogs\\${blog.id}`}>
          {blog.title}
        </Link>
      </div>
    )
  }

  return (
    <>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
              <LinkToBlog key={blog.id} blog={blog} />
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default BlogList
