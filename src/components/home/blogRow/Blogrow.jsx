import { Col, Container, Row } from "react-bootstrap";
import SingleBlog from "../single blog/SingleBlog";

const BlogRow = () => {
  return (
    <Container>
      <Row xs={4}>
        <Col>
          <SingleBlog />
        </Col>
      </Row>
    </Container>
  );
};
export default BlogRow;
