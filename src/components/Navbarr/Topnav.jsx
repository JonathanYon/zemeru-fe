import {
  Nav,
  Form,
  FormControl,
  Navbar,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsEnvelopeFill, BsCoin } from "react-icons/bs";
import "./topnav.css";
import { useState } from "react";

const Topnav = () => {
  const [logged, setLogged] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Popover right</Popover.Title>
      <Popover.Content>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <Navbar className="mx-5">
        <Nav className="mr-auto">
          {logged && (
            <>
              <div>
                <img
                  src="https://picsum.photos/200"
                  width="30"
                  height="30"
                  className="d-inline-block align-top rounded-circle profile-img"
                  alt="React Bootstrap logo"
                />
                19 c
              </div>
              <Nav.Link href="#features">
                <IoNotificationsOutline /> Me
              </Nav.Link>
              <Nav.Link href="#features">
                <BsEnvelopeFill /> Messages
              </Nav.Link>
              <Nav.Link href="#features">
                <BsCoin /> Earn coins
              </Nav.Link>
            </>
          )}
          <Nav.Link href="#pricing" className="pr-3">
            Home
          </Nav.Link>
          <Nav.Link href="#pricing" className="pr-3">
            Shop
          </Nav.Link>
          <Nav.Link href="#pricing" className="pr-3">
            Post
          </Nav.Link>
        </Nav>
        <Navbar.Brand href="#home" className="mr-auto">
          ዘመሩ
        </Navbar.Brand>

        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search lyrics or blog"
              className="mr-sm-2"
            />
          </Form>
        </OverlayTrigger>
        {!logged && (
          <>
            <Nav.Link href="#home">Sing In</Nav.Link>
            <Nav.Link href="#features">Sign Up</Nav.Link>
          </>
        )}
      </Navbar>
    </>
  );
};
export default Topnav;
