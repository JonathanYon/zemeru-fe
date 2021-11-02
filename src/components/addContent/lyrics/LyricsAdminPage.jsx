import { useEffect, useState } from "react";
import diff from "simple-text-diff";
import ContentEditable from "react-contenteditable";
import { Container, Button, Col, Row } from "react-bootstrap";
import "./add-lyrics.css";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const LyricsAdminPage = ({ match }) => {
  const [officialL, setOfficialL] = useState();
  const [edit, setEdit] = useState(true);
  const [lyrics, setLyrics] = useState([]);

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
    <Container className="mb-5">
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
                          .after
                      }
                      disabled={true}
                      // onChange={(e) => setOfficialL(e.target.value)}
                    />
                    <div className="mb-2">
                      <Link to={`/edited/${lyr._id}/lyrics/${edited._id}`}>
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
