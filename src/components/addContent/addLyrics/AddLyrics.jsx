import { Col, Container, Form, Row } from "react-bootstrap";

const AddLyrics = () => {
  return (
    <Container>
      <Row>
        <Col xs={6}>
          <Form>
            <Form.Group controlId="formGroupBy">
              <Form.Label>By</Form.Label>
              <Form.Control type="text" placeholder="The artist/writer" />
            </Form.Group>
            <Form.Group controlId="formGroupTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Title" />
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <h5>hello</h5>
        </Col>
      </Row>
    </Container>
  );
};
export default AddLyrics;
