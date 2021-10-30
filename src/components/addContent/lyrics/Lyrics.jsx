import { useEffect, useState } from "react";
import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import ContentEditable from "react-contenteditable";
import { jwtId } from "../../../utils";
import Comments from "../../home/comments/Comments";

const Lyrics = (props) => {
  const [lyric, setLyric] = useState(null);
  const [html, setHtml] = useState(null);
  const [edit, setEdit] = useState(true);

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
          console.log("Lyric,jsx", res);
          setLyric(res);
          setHtml(res.officialLyric);
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
  return (
    <>
      <Jumbotron
        fluid
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/proxy/7jaQrdQKDIa71rC-jnVLbw8o8BqHf1YJwoWvB96fbB91Z2aMDn6bQOADuZeJut2zZbBqolkTR_BmlawOIsx7AWh1wpApPP3QJikUtObsz2Ro_DHgGTRpj1zoNe030bjY8CUty32ey2NaRKTMNYJnl9RmC93s0Y5rh3c6')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "100% 100%",
        }}
      >
        <Container className="text-black position-relative">
          <h1>Fluid jumbotron</h1>
          <p>
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
          <div className="my-photo ">
            <img
              //   src="https://www.gannett-cdn.com/-mm-/fd5c5b5393c72a785789f0cd5bd20acedd2d2804/c=0-350-2659-1850/local/-/media/Phoenix/BillGoodykoontz/2014/04/24//1398388295000-Homer-Simpson.jpg"
              src={lyric?.coverImage}
              alt=""
              className="photo"
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
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default withRouter(Lyrics);
