import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { jwtId } from "../../../utils";
import { withRouter } from "react-router";

const AddLyrics = (props) => {
  // console.log("id", jwtId(window.localStorage.getItem("Token"))._id);

  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const [lyrics, setLyrics] = useState({
    artist: "",
    title: "",
    mezmurType: "",
    officialLyric: "",
    youtubeLink: "",
    coverImage: "",
    releaseDate: startDate,
    userId: jwtId(window.localStorage.getItem("Token"))._id,
  });

  const handleChange = (key, value) => {
    setLyrics({ ...lyrics, [key]: value });
  };
  const handleChangeQuill = (value) => {
    setLyrics({ ...lyrics, officialLyric: value });
  };

  // const handleChange = (e) => {
  //   const { id, value } = e.target;
  //   setContents((prevState) => ({
  //     ...prevState,
  //     [id]: value,
  //   }));
  // };

  const handlelyrics = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_URL}/lyrics`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lyrics),
      });
      if (response.ok) {
        setLoading(false);

        // alert("Great");

        props.history.push("/");
        const res = await response.json();
        // window.localStorage.setItem("Token", res.accessToken);
        console.log(res);
      } else {
        setLoading(false);
        setErrors(true);
        // alert("something wrong");
      }
    } catch (error) {
      setErrors(true);
      console.log(error);
    }
  };

  return (
    <Container className="mb-5">
      {loading && <Spinner animation="grow" className="mt-3" />}
      {errors && (
        <ListGroup className="mt-1 mx-5">
          <ListGroup.Item variant="danger">
            <strong>Something has gone wrong please come back again</strong>
          </ListGroup.Item>
        </ListGroup>
      )}
      <Row>
        <Col xs={6}>
          <Form onSubmit={handlelyrics}>
            <Form.Group>
              <Form.Label>By</Form.Label>
              <Form.Control
                type="text"
                id="artist"
                placeholder="The artist/writer"
                onChange={(e) => handleChange("artist", e.target.value)}
                value={lyrics.artist}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                id="title"
                placeholder="Title"
                onChange={(e) => handleChange("title", e.target.value)}
                value={lyrics.title}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                id="mezmurType"
                onChange={(e) => handleChange("mezmurType", e.target.value)}
                value={lyrics.mezmurType}
              >
                <option>ልመና</option>
                <option>ንስሓ</option>
                <option>ምስጋና</option>
                <option>ኣምልኾ</option>
                <option>ድ.ማርያም</option>
              </Form.Control>
            </Form.Group>
            {/* <Form.Group className="mt-3"> */}
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              id="officialLyric"
              className="bg-light"
              value={lyrics.officialLyric}
              onChange={handleChangeQuill}
            />
            {/* </Form.Group> */}
            <Form.Group>
              <Form.Label>YouTube Link</Form.Label>
              <Form.Control
                type="text"
                id="youtubeLink"
                placeholder="www.youtube.com/3223bjik"
                onChange={(e) => handleChange("youtubeLink", e.target.value)}
                value={lyrics.youtubeLink}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cover photo of the Song</Form.Label>
              <Form.Control
                type="text"
                id="coverImage"
                placeholder="coverPhoto.png"
                onChange={(e) => handleChange("coverImage", e.target.value)}
                value={lyrics.coverImage}
              />
            </Form.Group>
            <Form.Group id="formGroupDate">
              <Form.Label>Release Date</Form.Label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
        <Col className="mt-5">
          <h5>First time transcribing</h5>
          <p>Here is a "How to.." guide</p>
          <ol className="text-left">
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
              Only add a song to Zemeru if it has been officially released.
              Fan-made mashups, songs that leak pre-release, and songs that
              violate our community policy are not allowed on Zemeru.
            </li>
            <p>
              To learn more about adding songs on Zemeru, check out the full
              guide (here) link.
            </p>
          </ol>
        </Col>
      </Row>
    </Container>
  );
};
export default withRouter(AddLyrics);
