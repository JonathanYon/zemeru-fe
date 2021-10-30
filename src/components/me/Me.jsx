import { Jumbotron, Container, Row, Col, Button } from "react-bootstrap";
import LeftCard from "./card/LeftCard";
import "./me.css";

const Me = ({ me }) => {
  return (
    <>
      <Jumbotron
        fluid
        style={{
          backgroundImage: `url(${me.avatar})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "100% 100%",
        }}
      >
        <Container className="text-black position-relative">
          <h1>Fluid jumbotron</h1>
          {/* <p>
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p> */}
          <div className="my-photo ">
            <img
              // src="https://www.gannett-cdn.com/-mm-/fd5c5b5393c72a785789f0cd5bd20acedd2d2804/c=0-350-2659-1850/local/-/media/Phoenix/BillGoodykoontz/2014/04/24//1398388295000-Homer-Simpson.jpg"
              src={me?.avatar}
              alt=""
              className="photo"
            />
          </div>
        </Container>
        <div className="d-flex follow text-black">
          <small className="pr-4">Featured</small>
          <small className="pr-4">Followers</small>
          <small className="pr-4">Following</small>
        </div>
      </Jumbotron>

      <Container className="mt-5">
        <Row>
          <Col xs={4}>
            <h5>@{me?.username}</h5>
            <Button className="bg-light text-black-50 mb-2">Edit</Button>
            <LeftCard />
            <LeftCard />
          </Col>
          <Col xs={6}>
            <LeftCard />
            <LeftCard />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Me;
