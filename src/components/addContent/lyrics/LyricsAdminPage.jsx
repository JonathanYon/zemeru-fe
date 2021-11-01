import { useEffect, useState } from "react";
import diff from "simple-text-diff";
import ContentEditable from "react-contenteditable";
import { Container, Button, Col, Row } from "react-bootstrap";
import "./add-lyrics.css";

const LyricsAdminPage = () => {
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
          {edit ? (
            <Button
              variant="secondary"
              // onClick={() => setEdit(!edit)}
            >
              Edit Lyrics
            </Button>
          ) : (
            <div>
              <Button
                variant="success"
                //   onClick={editLyrics}
              >
                Propose correction
              </Button>
              <Button
                variant="dark"
                //   onClick={() => setEdit(!edit)}
              >
                Cancel
              </Button>
            </div>
          )}
          {/* edited.updatedLyric */}
          <h3 className="my-4">hello</h3>
        </Col>
      </Row>
    </Container>
  );
};
export default LyricsAdminPage;
/* <Col xs={6}>hi*************/ ///++++++++</Col> */
