import {
  Badge,
  Col,
  Container,
  Row,
  Table,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LyricsChart = () => {
  const lyrics = useSelector((state) => state.allLyrics.lyrics);
  const me = useSelector((state) => state.user.me);
  const loading = useSelector((state) => state.blogs.loading);
  const errors = useSelector((state) => state.blogs.error);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h3>Top Searched Lyrics</h3>
          {loading && (
            <div className=" h-100 d-flex justify-content-center align-items-center">
              <Spinner animation="grow" className="mt-3" />
            </div>
          )}
          {errors && (
            <ListGroup className="mt-1 mx-5">
              <ListGroup.Item variant="danger">
                <strong>Something has gone wrong please come back again</strong>
              </ListGroup.Item>
            </ListGroup>
          )}
          <Table striped bordered hover>
            <tbody className="text-left">
              {lyrics.map((lyric, i) => (
                <tr key={lyric._id}>
                  <td>
                    <span className="num">{i + 1}.</span>
                    <img
                      src={lyric.coverImage}
                      alt="mezmur cover photo"
                      className="rounded-circle ml-3"
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <Link to={`/lyric/${lyric._id}`}>
                    <td>
                      {lyric.title}{" "}
                      {me?.role === "Editor" &&
                        lyric.editedLyrics.length !== 0 && (
                          <Badge variant="warning">
                            {lyric.editedLyrics.length}
                          </Badge>
                        )}
                    </td>
                  </Link>
                  <td className="num">{lyric.artist}</td>
                  <td>{lyric.mezmurType}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default LyricsChart;
