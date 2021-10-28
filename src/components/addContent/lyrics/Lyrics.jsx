import { useEffect, useState } from "react";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import { withRouter } from "react-router";
import { FaThumbsUp } from "react-icons/fa";
import ContentEditable from "react-contenteditable";

const Lyrics = (props) => {
  const [lyric, setLyric] = useState(null);
  const [html, setHtml] = useState(null);

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
        setHtml(res.officialLyric);
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

      <Container className="mb-5">
        <Row>
          <Col xs={6}>
            <h3 className="my-4">{lyric?.title}</h3>
            <ContentEditable
              html={html}
              disabled={true}
              onChange={(e) => setHtml(e.target.value)}
            />
          </Col>
          <Col xs={6}>
            <div className="row d-flex justify-content-center">
              <div
              //   className="col-md-8 col-lg-6"
              >
                <div
                  className="card shadow-0 border"
                  style={{ backgroundColor: "#f0f2f5" }}
                >
                  <div className="card-body p-4">
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="addANote"
                        className="form-control"
                        placeholder="Type comment..."
                      />
                      <label className="form-label" for="addANote">
                        + Add a note
                      </label>
                    </div>

                    <div className="card mb-4">
                      <div className="card-body">
                        <p>Type your note, and hit enter to add it</p>

                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <img
                              src="https://mdbootstrap.com/img/Photos/Avatars/img%20(4).jpg"
                              alt="avatar"
                              className="rounded-circle mr-1"
                              style={{ width: "25px", height: "25px" }}
                            />
                            <p className="small mb-0 ms-2">Martha</p>
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            <p className="small text-muted mb-0">Upvote?</p>
                            <FaThumbsUp
                              className="mx-2"
                              style={{ marginTop: "-0.16rem" }}
                            />

                            <p className="small text-muted mb-0">3</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mb-4">
                      <div className="card-body">
                        <p>Type your note, and hit enter to add it</p>

                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <img
                              src="https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg"
                              alt="avatar"
                              className="rounded-circle mr-1"
                              style={{ width: "25px", height: "25px" }}
                            />
                            <p className="small mb-0 ms-2">Johny</p>
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            <p className="small text-muted mb-0">Upvote?</p>
                            <FaThumbsUp
                              className="mx-2"
                              style={{ marginTop: "-0.16rem" }}
                            />

                            <p className="small text-muted mb-0">4</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default withRouter(Lyrics);
