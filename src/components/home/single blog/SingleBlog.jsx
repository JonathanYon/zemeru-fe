import "./single-blog.css";
import { Card } from "react-bootstrap";

const SingleBlog = () => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://dailygazette.com/wp-content/uploads/fly-images/134790/homer-940x940.png"
      />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default SingleBlog;
