import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { withRouter } from "react-router";
import ContentEditable from "react-contenteditable";
import { jwtId } from "../../../utils";
import Comments from "./comments/Comments";
import YoutubeVideo from "./YoutubeVideo";
import "./add-lyrics.css";
import { Link } from "react-router-dom";
import SocialMedia from "../SocialMedia";

const Lyrics = (props) => {
  const [lyric, setLyric] = useState(null);
  const [html, setHtml] = useState(null);
  const [edit, setEdit] = useState(true);
  const [yt, setYt] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [editLoad, setEditLoad] = useState(false);

  const [show, setShow] = useState(false);

  const { id } = props.match.params;
  const handleClose = () => setShow(false);

  useEffect(() => {
    const getLyric = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_URL}/lyrics/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
            },
          }
        );
        if (response.ok) {
          const res = await response.json();
          setLoading(false);
          setLyric(res);
          setHtml(res.officialLyric);
          setYt(res.youtubeLink);
        } else {
          setLoading(false);
          setErrors(true);
        }
      } catch (error) {
        setLoading(false);
        setErrors(true);
        console.log(error);
      }
    };
    getLyric();
  }, [id, edit]);

  const editLyrics = async () => {
    try {
      setEditLoad(true);
      const payload = {
        updatedLyric: html,
        userId: jwtId(window.localStorage.getItem("Token"))._id,
      };
      const respo = await fetch(
        `${process.env.REACT_APP_URL}/lyrics/updateLyrics/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (respo.ok) {
        setShow(true);
        setEditLoad(false);

        setEdit(!edit);
      } else {
        setEditLoad(false);

        setShow(false);
      }
    } catch (error) {
      setEditLoad(false);

      setShow(false);
      console.log(error);
    }
  };
  console.log("LRC", lyric);
  // console.log("href", window.location.href);
  return (
    <>
      <Container
        fluid
        className=" big-info-container"
        style={{
          backgroundImage: `url(${lyric?.coverImage})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "100% 100%",
          objectFit: "cover",
        }}
      >
        <Container className="info-container">
          <Row style={{ height: "40vh" }}>
            <Col>
              <Col className="position-relative d-flex">
                {/* <div>
                  <img
                    src={lyric?.coverImage}
                    alt=""
                    className="mezmur-cover mt-5"
                    style={{ height: "14vw", width: "14vw" }}
                  />
                </div> */}
                <div className="text-white mt-4 d-flex">
                  <img
                    src={lyric?.coverImage}
                    alt=""
                    // className="mezmur-cover mt-5"
                    style={{ height: "14vw", width: "14vw" }}
                  />
                  <div className="text-left ml-3">
                    <h2 className="font-weight-bold">{lyric?.title}</h2>
                    <h3>{lyric?.artist}</h3>

                    <img
                      src={lyric?.userId.avatar}
                      className="rounded-circle mr-1"
                      width="25"
                      height="25"
                      alt=""
                    />
                    <strong>
                      <small className="text-white-50 font-weight-bold">
                        Transcribed by:{" "}
                      </small>
                      {lyric?.userId.username}
                    </strong>
                    <br />
                    <strong>
                      <small className="text-white-50">
                        Number of proposed correction on this Lyrics:{" "}
                      </small>
                      {lyric?.editedLyrics.length}
                    </strong>
                  </div>
                </div>
              </Col>
            </Col>
            {/* <Col>yes</Col> */}
          </Row>
        </Container>
      </Container>

      <Container className="my-5">
        {show && (
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title className="text-success">
                <strong>
                  Thanks! we have received your correction proposal
                </strong>
              </Modal.Title>
            </Modal.Header>
          </Modal>
        )}
        <Row className="d-sm-flex">
          <Col xs={6}>
            {errors && (
              <ListGroup className="mt-1 mx-5">
                <ListGroup.Item variant="danger">
                  <strong>
                    Something has gone wrong please come back again
                  </strong>
                </ListGroup.Item>
              </ListGroup>
            )}
            {edit ? (
              <Button
                variant="light"
                className="border-dark font-weight-bold mt-1"
                onClick={() => setEdit(!edit)}
              >
                Edit Lyrics
              </Button>
            ) : (
              <div>
                {editLoad && <Spinner animation="grow" className="mt-1" />}
                <Button
                  variant="light"
                  className="mr-2 text-success border-success font-weight-bold"
                  onClick={editLyrics}
                >
                  Propose correction
                </Button>
                <Button
                  variant="light"
                  className="mr-2 text-danger border-danger font-weight-bold"
                  onClick={() => setEdit(!edit)}
                >
                  Cancel
                </Button>
              </div>
            )}
            {loading && (
              <div className=" h-100 d-flex justify-content-center align-items-center">
                <Spinner animation="grow" className="mt-3" />
              </div>
            )}

            <h3 className="my-4">{lyric?.title}</h3>
            <ContentEditable
              html={html}
              disabled={edit}
              onChange={(e) => setHtml(e.target.value)}
            />
          </Col>
          <Col xs={6}>
            <Comments />
            <YoutubeVideo ytVideo={yt} />
          </Col>
        </Row>
      </Container>
      <SocialMedia pageURL={window.location.href} content="Lyrics" />
    </>
  );
};
export default withRouter(Lyrics);
