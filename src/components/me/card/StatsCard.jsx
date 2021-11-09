import { Card, Container, Row, Col } from "react-bootstrap";
import "./left-card.css";
import { MdComment } from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";

import { useState } from "react";

const StatsCard = ({ commentNumber, lyricNum, editNum }) => {
  return (
    <Card className="left-card mt-5 py-3">
      <Container>
        <Row>
          <Col className="d-flex justify-content-lg-between">
            <div className="mr-0 d-flex flex-column">
              <div>
                {commentNumber}
                <MdComment className="ml-3 stat-icons" />
              </div>
              <small className="icon-name">Comment/Suggestion</small>
            </div>
            <div className="mr-0 d-flex flex-column">
              <div>
                {lyricNum}
                <IoNewspaper className="ml-3 stat-icons" />
              </div>
              <small className="icon-name">Transcription</small>
            </div>
            <div className="mr-0 d-flex flex-column">
              <div>
                {editNum}
                <GrEdit className="ml-3 stat-icons" />
              </div>
              <small className="icon-name">Lyrics Edit</small>
            </div>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};
export default StatsCard;
