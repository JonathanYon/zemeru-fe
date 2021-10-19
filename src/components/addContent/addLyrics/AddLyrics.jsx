import { Col, Container, Form, Row } from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";

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
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="d-flex flex-column"
            >
              <Form.Label>Example textarea</Form.Label>
              <TextareaAutosize minRows={10} />
            </Form.Group>
            <Form.Group controlId="formGroupTitle">
              <Form.Label>YouTube Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="www.youtube.com/3223bjik"
              />
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
