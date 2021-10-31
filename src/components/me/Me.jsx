import { useState } from "react";
import { Jumbotron, Container, Row, Col, Button, Modal } from "react-bootstrap";
import LeftCard from "./card/LeftCard";
import "./me.css";

const Me = ({ me }) => {
  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const imageHandler = (e) => {
    let postImage = new FormData();
    postImage.append("avatar", e.target.files[0]);
    setAvatar(postImage);
  };

  const addAvatar = async (e) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/users/me/avatar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
          body: avatar,
        }
      );
      if (response.ok) {
        alert("Sent");
      } else {
        alert("something wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form encType="multipart/form-data" action="">
              <input
                id="id-for-upload-file"
                type="file"
                onChange={imageHandler}
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={addAvatar}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
            <Button
              className="bg-light text-black-50 mb-2"
              onClick={handleShow}
            >
              Edit
            </Button>
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
