import {
  Dropdown,
  DropdownButton,
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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { myLogin } from "../../Redux/action";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const Topnav = ({ props }) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Popover right</Popover.Title>
      <Popover.Content>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Content>
    </Popover>
  );
  const me = useSelector((state) => state.user.me);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(myLogin());
  }, []);
  console.log("props", me);
  return (
    <>
      <Navbar className="mx-5">
        <Nav className="mr-auto">
          {me && (
            <>
              <div>
                <img
                  src={me ? me.avatar : "https://picsum.photos/200"}
                  width="30"
                  height="30"
                  className="d-inline-block align-top rounded-circle profile-img"
                  alt="React Bootstrap logo"
                />
              </div>
              {/* <Nav.Link href="#features">
                <IoNotificationsOutline /> Me
              </Nav.Link>
              <Nav.Link href="#features">
                <BsEnvelopeFill /> Messages
              </Nav.Link>
              <Nav.Link href="#features">
                <BsCoin /> Earn coins
              </Nav.Link> */}
            </>
          )}
          <Nav.Link href="#pricing" className="pr-3">
            Home
          </Nav.Link>
          <Nav.Link href="#pricing" className="pr-3">
            Shop
          </Nav.Link>
          {/* <Nav.Link href="#pricing" className="pr-3">
            Post
          </Nav.Link> */}
          <DropdownButton id="dropdown-basic-button" title="Post">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
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
        {!me && (
          <>
            <Link to="/login">
              <Nav.Link href="#home">Sing In</Nav.Link>
            </Link>
            <Link to="/register">
              <Nav.Link href="#features">Sign Up</Nav.Link>
            </Link>
          </>
        )}
      </Navbar>
      <hr />
    </>
  );
};
export default withRouter(Topnav);
