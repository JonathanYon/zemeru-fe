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

import "./topnav.css";
import "../../asset/logo.jpeg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { myLogin } from "../../Redux/action";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const Topnav = ({ props }) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Search Result</Popover.Title>
      <Popover.Content>
        {result?.map((lyric) => (
          <div>
            <span>
              <Link to={`/lyric/${lyric._id}`}>
                <strong>{lyric.title}</strong>
              </Link>{" "}
              መዝሙር ብ <i>{lyric.artist}</i>:
            </span>
            <hr />
          </div>
        ))}
      </Popover.Content>
    </Popover>
  );
  const me = useSelector((state) => state.user.me);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("topnav");
    dispatch(myLogin());
  }, []);
  useEffect(() => {
    const getAllLyrics = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/lyrics?officialLyric=${
            query?.indexOf(" ") ? decodeURI(query) : query
          }`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
            },
          }
        );
        if (response.ok) {
          const res = await response.json();
          // console.log(res);
          setResult(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllLyrics();
  }, [query]);
  // console.log("query", query);
  // console.log("result", result);
  return (
    <>
      <Navbar className="mx-5">
        <Nav className="mr-auto">
          {me && (
            <>
              <Link to="/me">
                <div>
                  <img
                    src={me ? me.avatar : "https://picsum.photos/200"}
                    width="30"
                    height="30"
                    className="d-inline-block align-top rounded-circle profile-img"
                    alt="React Bootstrap logo"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Link>
            </>
          )}
          <Link to="/">
            <Nav.Link href="#pricing" className="pr-3">
              Home
            </Nav.Link>
          </Link>
          <Nav.Link href="#pricing" className="pr-3">
            Shop
          </Nav.Link>
          {/* <Nav.Link href="#pricing" className="pr-3">
            Post
          </Nav.Link> */}
        </Nav>
        <Navbar.Brand href="#home" className="mr-auto">
          <img
            src={`${process.env.PUBLIC_URL}/logo.svg`}
            alt="logo"
            style={{
              width: "150px",
              height: "80px",
              backgroundColor: "none",
              filter: "drop-shadow(5px 5px 5px #222)",
              WebkitFilter: "drop-shadow(5px 5px 5px #222)",
            }}
          />
        </Navbar.Brand>

        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search lyrics or blog"
              className="mr-sm-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Form>
        </OverlayTrigger>
        <DropdownButton id="dropdown-basic-button" title="Post">
          <Link to="/addLyrics">
            <Dropdown.Item href="#/action-1">Add song</Dropdown.Item>
          </Link>
          <Link to="/addBlog">
            <Dropdown.Item href="#/action-2">Add Blog</Dropdown.Item>
          </Link>
        </DropdownButton>
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
