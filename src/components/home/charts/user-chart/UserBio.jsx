import { Card } from "react-bootstrap";
import "../chart.css";
import { BiPencil } from "react-icons/bi";
import { useState } from "react";

const UserBio = (props) => {
  return (
    <Card className="left-card">
      <Card.Body>{props.bio && props.bio}</Card.Body>
    </Card>
  );
};
export default UserBio;
