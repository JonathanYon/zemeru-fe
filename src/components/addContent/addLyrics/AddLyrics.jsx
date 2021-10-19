import { Col, Container, Form, Row } from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddLyrics = () => {
  const [startDate, setStartDate] = useState(new Date());

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
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Example multiple select</Form.Label>
              <Form.Control as="select">
                <option>ልመና</option>
                <option>ንስሓ</option>
                <option>ምስጋና</option>
                <option>ኣምልኾ</option>
                <option>ድ.ማርያም</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="d-flex flex-column"
            >
              <Form.Label>Lyrics</Form.Label>
              <TextareaAutosize minRows={10} />
            </Form.Group>
            <Form.Group controlId="formGroupLink">
              <Form.Label>YouTube Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="www.youtube.com/3223bjik"
              />
            </Form.Group>
            <Form.Group controlId="formGroupDate">
              <Form.Label>Release Date</Form.Label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <h5>First time transcribing</h5>
          <p>Here is a "How to.." guide</p>
          <ol>
            <li>
              Type out all lyrics, even when a section of the song is repeated.
              Everything in the song should be transcribed, including adlibs,
              producer tags, etc. If you don’t understand a lyric, use “[?]”
              instead.
            </li>
            <li>
              Make sure to break transcriptions up into individual lines and use
              section headers above different song parts.
            </li>
            <li>
              Only add a song to Genius if it has been officially released.
              Fan-made mashups, songs that leak pre-release, and songs that
              violate our community policy are not allowed on ዘመሩ.
            </li>
            <p>
              To learn more about adding songs on Genius, check out the full
              guide (here) link.
            </p>
          </ol>
        </Col>
      </Row>
    </Container>
  );
};
export default AddLyrics;
