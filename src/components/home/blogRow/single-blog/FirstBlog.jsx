import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const FirstBlog = () => {
  const blogs = useSelector((state) => state.blogs.articles[0]);

  console.log("blog", blogs);
  return (
    <Card className="ml-5 mb-4 d-flex flex-row">
      <Link to={`/blogs/${blogs._id}`}>
        <Card.Img variant="top" src={blogs.cover} />
      </Link>
      <Card.Body>
        <Card.Title>{blogs.title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default withRouter(FirstBlog);
