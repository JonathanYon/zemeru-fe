import "./single-blog.css";
import { Card, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const SingleBlog = ({ blog }) => {
  return (
    // <Col>

    <Card style={{ width: "18rem" }} className="ml-5 mb-4">
      <Link to={`/blogs/${blog._id}`}>
        <Card.Img
          variant="top"
          // src="https://dailygazette.com/wp-content/uploads/fly-images/134790/homer-940x940.png"
          src={blog.cover}
        />
      </Link>
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
    // </Col>
  );
};
export default withRouter(SingleBlog);
