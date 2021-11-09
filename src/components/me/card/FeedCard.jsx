import { Card, Container, Row, Col, Badge } from "react-bootstrap";
import { format, formatDistanceToNow } from "date-fns";
import "./left-card.css";
import { MdComment } from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";

import { useState } from "react";

const FeedCard = (props) => {
  return (
    <>
      <Card className="left-card mt-5 py-3">
        <Container>
          <Row>
            <Col className="d-flex justify-content-lg-between">
              <div className="d-flex">
                <div className="mr-3">
                  <MdComment />
                </div>
                <div className="text-left mr-5">
                  <div>You commented on a Lyrics or Blog</div>
                  <div>
                    <strong>Title of the Lyrics or Blog</strong>
                  </div>
                  <div>
                    <Badge variant="success">my comment</Badge>
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
    </>
  );
};
export default FeedCard;
