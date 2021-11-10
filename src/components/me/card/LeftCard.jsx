import { Card } from "react-bootstrap";
import "./left-card.css";
import { BiPencil } from "react-icons/bi";
import { useState } from "react";

const LeftCard = (props) => {
  return (
    <Card className="left-card">
      <Card.Body>
        {props.bio && props.bio} {props.title}
      </Card.Body>
    </Card>
  );
};
export default LeftCard;
