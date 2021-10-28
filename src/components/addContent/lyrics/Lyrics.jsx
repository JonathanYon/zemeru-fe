import { useEffect, useState } from "react";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import { withRouter } from "react-router";
import { FaThumbsUp } from "react-icons/fa";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const Lyrics = (props) => {
  const [lyric, setLyric] = useState(null);

  const { id } = props.match.params;

  useEffect(() => {
    const getLyric = async () => {
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
      }
    };
    getLyric();
  }, [id]);
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

      <Container>
        <Row>
          <Col xs={6}>
            <div
              dangerouslySetInnerHTML={{ __html: lyric?.officialLyric }}
              style={{ lineHeight: "2px" }}
            ></div>
          </Col>
          <Col xs={6}></Col>
        </Row>
      </Container>
    </>
  );
};
export default withRouter(Lyrics);
