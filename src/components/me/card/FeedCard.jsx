import { Card, Container, Row, Col, Badge } from "react-bootstrap";
import { format, formatDistanceToNow } from "date-fns";
import "./left-card.css";
import { MdComment } from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";

const FeedCard = ({ comment, lyrIwrite, blogComment }) => {
  //   console.log(lyrIwrite)

  return (
    <>
      <>
        {comment && (
          <Card className="left-card mt-1 py-3">
            <Container>
              <Row>
                <Col className="d-flex justify-content-lg-between">
                  <div className="d-flex">
                    <div className="mr-3">
                      <MdComment className="text-dark" />
                    </div>
                    <div className="text-left mr-5">
                      <div>You commented on {comment.title} Lyrics</div>

                      <div>
                        <strong>Lyrics Title {comment.title}</strong>
                      </div>
                      <div>
                        {comment.comments.map((com, i) => (
                          <Badge variant="success" className="mr-1" key={i + 1}>
                            {com}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <FaRegCalendarAlt className="mb-1 ml-3" />
                    <span className="feed-date">
                      {formatDistanceToNow(new Date(2021, 11, 7))}
                    </span>
                  </div>
                </Col>
              </Row>
            </Container>
          </Card>
        )}
      </>
      {lyrIwrite && (
        <>
          {lyrIwrite.map((song, i) => (
            <Card className="left-card mt-1 py-3" key={i + 1}>
              <Container>
                <Row>
                  <Col className="d-flex justify-content-lg-between">
                    <div className="d-flex">
                      <div className="mr-3">
                        <IoNewspaper className="text-primary" />
                      </div>
                      <div className="text-left mr-5">
                        <div>
                          You transcribed {song.title} by {song.artist}
                        </div>

                        <div>
                          <strong>Lyrics Title {song.title}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column">
                      <FaRegCalendarAlt className="mb-1 ml-3" />
                      <span className="feed-date">
                        {formatDistanceToNow(new Date(2021, 11, 7))}
                      </span>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Card>
          ))}
        </>
      )}
      <>
        {blogComment && (
          <Card className="left-card mt-1 py-3">
            <Container>
              <Row>
                <Col className="d-flex justify-content-lg-between">
                  <div className="d-flex">
                    <div className="mr-3">
                      <MdComment className="text-dark" />
                    </div>
                    <div className="text-left mr-5">
                      <div>You commented on {blogComment.author}'s article</div>

                      <div>
                        <strong>
                          {blogComment.author} discusses about{" "}
                          {blogComment.title} in this article.
                        </strong>
                      </div>
                      <div>
                        {blogComment.comments.map((com, i) => (
                          <Badge variant="success" className="mr-1" key={i + 1}>
                            {com}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <FaRegCalendarAlt className="mb-1 ml-3" />
                    <span className="feed-date">
                      {formatDistanceToNow(new Date(2021, 11, 7))}
                    </span>
                  </div>
                </Col>
              </Row>
            </Container>
          </Card>
        )}
      </>
    </>
  );
};
export default FeedCard;
