import { useEffect, useState } from "react";
import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import ContentEditable from "react-contenteditable";
import { jwtId } from "../../../utils";
import Comments from "../../home/comments/Comments";
import YoutubeVideo from "./YoutubeVideo";
import "./add-lyrics.css";

const Lyrics = (props) => {
  const [lyric, setLyric] = useState(null);
  const [html, setHtml] = useState(null);
  const [edit, setEdit] = useState(true);
  const [yt, setYt] = useState("");

  const { id } = props.match.params;

  useEffect(() => {
    const getLyric = async () => {
      try {
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
          // console.log("Lyric,jsx", res);
          setLyric(res);
          setHtml(res.officialLyric);
          setYt(res.youtubeLink);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLyric();
  }, [id, edit]);

  const editLyrics = async () => {
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
      alert("Thank you");
      setEdit(!edit);
    }
  };
  console.log("LRC", lyric);
  // console.log("YT", yt);
  return (
    <>
      {/* style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/logo.svg)`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "100% 100%",
          objectFit: "cover",
        }} */}

      {/* <Jumbotron fluid>
          <Container className="text-black position-relative">
            <ul>
              <li>መዝሙር: {lyric?.title}</li>
              <li>ዘማሪ/ት: {lyric?.artist}</li>
              <li>ኣስፈርቲ ግጥሚ: {lyric?.userId.username}</li>
            </ul>
            <div className="my-photo ">
              <img
                src={lyric?.coverImage}
                alt=""
                className="photo"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </Container>
          <div className="d-flex follow text-black">
            <small className="pr-4">Featured</small>
            <small className="pr-4">Followers</small>
            <small className="pr-4">Following</small>
          </div>
        </Jumbotron> */}

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
        <Row className="d-sm-flex">
          <Col xs={6}>
            {edit ? (
              <Button
                variant="light"
                className="border-dark font-weight-bold"
                onClick={() => setEdit(!edit)}
              >
                Edit Lyrics
              </Button>
            ) : (
              <div>
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
    </>
  );
};
export default withRouter(Lyrics);
