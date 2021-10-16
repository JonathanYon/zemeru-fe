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

const Topnav = () => {
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
      <Navbar bg="danger" variant="danger">
        <Nav className="mr-auto">
          {/* <Nav.Link href="#home">Sing In</Nav.Link>
          <Nav.Link href="#features">Sign Up</Nav.Link> */}
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
        </Nav>
        <Navbar.Brand href="#home" className="mr-auto">
          ዘመሩ
        </Navbar.Brand>

        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
        </OverlayTrigger>
      </Navbar>
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};
export default Topnav;
