import { Badge, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LyricsChart = () => {
  const lyrics = useSelector((state) => state.allLyrics.lyrics);
  const me = useSelector((state) => state.user.me);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h3>Top Searched Lyrics</h3>
          <Table striped bordered hover>
            <tbody>
              {lyrics.map((lyric, i) => (
                <tr key={lyric._id}>
                  <td>
                    {i + 1}.
                    <img
                      src={lyric.coverImage}
                      alt="mezmur cover photo"
                      className="rounded-circle ml-1"
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
                      {me.role === "Editor" &&
                        lyric.editedLyrics.length !== 0 && (
                          <Badge variant="warning">
                            {lyric.editedLyrics.length}
                          </Badge>
                        )}
                    </td>
                  </Link>
                  <td>{lyric.artist}</td>
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
