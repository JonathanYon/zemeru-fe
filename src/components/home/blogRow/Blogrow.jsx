import { Col, Container, Row } from "react-bootstrap";
import SingleBlog from "../single blog/SingleBlog";

const BlogRow = () => {
  return (
    <Container className="mt-5">
      <Row xs={4}>
        <Col>
          <SingleBlog />
        </Col>
      </Row>
    </Container>
  );
};
export default BlogRow;
