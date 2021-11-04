import { useEffect, useState } from "react";
import diff from "simple-text-diff";
import ContentEditable from "react-contenteditable";
import { Container, Button, Col, Row, Modal } from "react-bootstrap";
import "./add-lyrics.css";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const LyricsAdminPage = ({ match }) => {
  const [officialL, setOfficialL] = useState();
  // const [edit, setEdit] = useState(true);
  const [lyrics, setLyrics] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getEditedLyrics = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/lyrics/edited/lyrics`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
            },
          }
        );
        if (response.ok) {
          const res = await response.json();
          console.log("adminPage", res);
          setLyrics(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEditedLyrics();
  }, []);

  console.log("of-Lyc", officialL);
  return (
    <Container className="my-5">
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
      <Row>
        <Col>
          {lyrics.length === 0 ? (
            <>
              <p>No New edit by the user yet</p>
            </>
          ) : (
            lyrics.map((lyr) => (
              <div className="d-flex" key={lyr._id}>
                <ContentEditable
                  className="mr-4 bg-success mb-3"
                  html={lyr.officialLyric}
                  disabled={true}
                  // onChange={(e) => setOfficialL(e.target.value)}
                />

                {lyr.editedLyrics.map((edited) => (
                  <div key={edited._id}>
                    <ContentEditable
                      className="mr-4 bg-light"
                      html={
                        diff.diffPatch(lyr.officialLyric, edited.updatedLyric)
                          .before
                      }
                      disabled={true}
                      // onChange={(e) => setOfficialL(e.target.value)}
                    />
                    <div className="mb-2">
                      <Link
                        to={`/edited/${lyr._id}/lyrics/${edited._id}`}
                        onClick={handleShow}
                      >
                        <Button className="mr-2">Approve/Reject</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default withRouter(LyricsAdminPage);
/* <Col xs={6}>hi*************/ ///++++++++</Col> */
