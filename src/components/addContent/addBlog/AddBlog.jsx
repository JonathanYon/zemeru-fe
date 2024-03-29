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
import { jwtId } from "../../../utils";

const AddBlog = () => {
  const [contents, setContents] = useState({
    category: "",
    title: "",
    cover: "",
    youtubeLink: "",
    authors: jwtId(window.localStorage.getItem("Token"))._id,
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const handleChange = (key, value) => {
    setContents({ ...contents, [key]: value });
  };
  const handleChangeQuill = (value) => {
    setContents({ ...contents, content: value });
  };

  // const handleChange = (e) => {
  //   const { id, value } = e.target;
  //   setContents((prevState) => ({
  //     ...prevState,
  //     [id]: value,
  //   }));
  // };

  const handleBlog = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_URL}/blogs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contents),
      });
      if (response.ok) {
        setLoading(false);
        // alert("Great");

        // props.history.push("/");
        const res = await response.json();
        setContents({
          category: "",
          title: "",
          cover: "",
          youtubeLink: "",
          content: "",
        });
        // window.localStorage.setItem("Token", res.accessToken);
        console.log(res);
      } else {
        // alert("something wrong");
        setLoading(false);
        setErrors(true);
      }
    } catch (error) {
      setLoading(false);
      setErrors(true);
      console.log(error);
    }
  };

  return (
    <Container>
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
          <Form onSubmit={handleBlog}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                id="category"
                placeholder="Category"
                onChange={(e) => handleChange("category", e.target.value)}
                value={contents.category}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                id="title"
                placeholder="Title"
                onChange={(e) => handleChange("title", e.target.value)}
                value={contents.title}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>cover</Form.Label>
              <Form.Control
                type="text"
                id="cover"
                onChange={(e) => handleChange("cover", e.target.value)}
                value={contents.cover}
              />
            </Form.Group>
            {/* <Form.Group className="mt-3"> */}
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              id="content"
              className="bg-light"
              value={contents.content}
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
                value={contents.youtubeLink}
              />
            </Form.Group>

            <Button type="submit">Submit</Button>
          </Form>
        </Col>
        {/* <Col className="mt-5">
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
              Only add a song to Genius if it has been officially released.
              Fan-made mashups, songs that leak pre-release, and songs that
              violate our community policy are not allowed on ዘመሩ.
            </li>
            <p>
              To learn more about adding songs on Genius, check out the full
              guide (here) link.
            </p>
          </ol>
        </Col> */}
      </Row>
    </Container>
  );
};
export default AddBlog;
