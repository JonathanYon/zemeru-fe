import "./single-blog.css";
import { Card, Col, Row } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./single-blog.css";

const SingleBlog = ({ blog }) => {
  console.log("blog", blog);
  return (
    <Card
      // style={{ width: "18rem" }}
      className="ml-5 mb-4 card-container bg-transparent"
    >
      <Card.Img
        variant="top"
        src={blog.cover}
        className="front"
        style={{ objectFit: "cover" }}
      />

      <Link to={`/blogs/${blog._id}`}>
        <Card.Body className="back">
          {/* <Card.Title className="title">{blog.title}</Card.Title> */}
          <Card.Title>{blog.title}</Card.Title>
          <small>
            by <strong>{blog.authors[0].username} </strong>
            <br />
            <small>{format(new Date(blog.createdAt), "PP")}</small>
          </small>
        </Card.Body>
      </Link>
    </Card>
  );
};
export default withRouter(SingleBlog);
