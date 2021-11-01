import { useEffect, useState } from "react";
import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import ContentEditable from "react-contenteditable";
import { jwtId } from "../../../utils";
import Comments from "../../home/comments/Comments";
import YoutubeVideo from "./YoutubeVideo";

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
      <Jumbotron
        fluid
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/logo.svg)`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "100% 100%",
          objectFit: "cover",
        }}
      >
        <Container className="text-black position-relative">
          <ul>
            <li>መዝሙር: {lyric?.title}</li>
            <li>ዘማሪ/ት: {lyric?.artist}</li>
            <li>ኣስፈርቲ ግጥሚ: {lyric?.userId.username}</li>
          </ul>
          <div className="my-photo ">
            <img
              //   src="https://www.gannett-cdn.com/-mm-/fd5c5b5393c72a785789f0cd5bd20acedd2d2804/c=0-350-2659-1850/local/-/media/Phoenix/BillGoodykoontz/2014/04/24//1398388295000-Homer-Simpson.jpg"
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
      </Jumbotron>

      <Container className="mb-5">
        <Row>
          <Col xs={6}>
            {edit ? (
              <Button variant="secondary" onClick={() => setEdit(!edit)}>
                Edit Lyrics
              </Button>
            ) : (
              <div>
                <Button variant="success" onClick={editLyrics}>
                  Propose correction
                </Button>
                <Button variant="dark" onClick={() => setEdit(!edit)}>
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
