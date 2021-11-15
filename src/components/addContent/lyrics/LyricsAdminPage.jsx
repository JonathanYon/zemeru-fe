import { useEffect, useState } from "react";
import diff from "simple-text-diff";
import ContentEditable from "react-contenteditable";
import {
  Container,
  Button,
  Col,
  Row,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import "./add-lyrics.css";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";

const LyricsAdminPage = ({ match }) => {
  const [lyrics, setLyrics] = useState([]);
  const [change, setChange] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    const getEditedLyrics = async () => {
      try {
        setLoading(true);
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
          setLoading(false);

          const res = await response.json();
          console.log("adminPage", res);
          setLyrics(res);
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
    getEditedLyrics();
  }, [change]);

  console.log("edit++/_", lyrics);

  const deleteUserEdit = async (lId, eId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/lyrics/reject/${lId}/admin/${eId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        setChange(!change);
      } else {
        alert("something wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //-------------------------
  const updateUserEdit = async (lId, eId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/lyrics/approve/${lId}/admin/${eId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        // history.push("/adminPage");
        setChange(!change);
      } else {
        alert("something wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="my-5">
      {loading && <Spinner animation="grow" className="mt-3" />}
      {errors && (
        <ListGroup className="mt-1 mx-5">
          <ListGroup.Item variant="danger">
            <strong>Something has gone wrong please come back again</strong>
          </ListGroup.Item>
        </ListGroup>
      )}
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
                  className="mr-4 official-lyric-color mb-3"
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
                      {/* <Link
                        to={`/edited/${lyr._id}/lyrics/${edited._id}`}
                        onClick={handleShow}
                      >
                        <Button className="mr-2">
                          <BsCheckLg /> / <ImCross />
                        </Button>
                      </Link> */}
                      <Button
                        className="mr-2"
                        onClick={() => updateUserEdit(lyr._id, edited._id)}
                      >
                        <BsCheckLg />
                      </Button>
                      <Button
                        className="mr-2"
                        onClick={() => deleteUserEdit(lyr._id, edited._id)}
                      >
                        <ImCross />
                      </Button>
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
