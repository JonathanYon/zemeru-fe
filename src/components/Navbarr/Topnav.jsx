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

          setResult(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllLyrics();
  }, [query]);

  return (
    <>
      {/* <Navbar className="mx-5">
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
              className="mr-sm-2"
              placeholder="Search lyrics or blog"
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
      </Navbar> */}

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid justify-content-between">
          <div className="d-flex">
            <Link
              to="/"
              className="navbar-brand me-2 mb-1 d-flex align-items-center"
            >
              {/* <a
                className="navbar-brand me-2 mb-1 d-flex align-items-center"
                href="#"
              > */}
              <img
                // src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
                src={`${process.env.PUBLIC_URL}/logo.svg`}
                height="35"
                alt="logo"
                loading="lazy"
                style={{ marginTop: "2px" }}
              />
              {/* </a> */}
            </Link>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
            >
              <form className="input-group w-auto my-auto d-none d-sm-flex">
                <input
                  // autocomplete="off"
                  type="text"
                  className="form-control rounded"
                  placeholder="Search lyrics or blog"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ minWidth: "125px" }}
                />
              </form>
            </OverlayTrigger>
          </div>

          <ul className="navbar-nav flex-row">
            {me && (
              <li className="nav-item me-3 me-lg-1">
                <Link
                  to="/me"
                  className="nav-link d-sm-flex align-items-sm-center"
                >
                  {/* <a className="nav-link d-sm-flex align-items-sm-center" href="#"> */}
                  <img
                    src={me ? me.avatar : "https://picsum.photos/200"}
                    className="rounded-circle"
                    height="22"
                    alt=""
                    loading="lazy"
                  />
                  <strong className="d-none d-sm-block ms-1">
                    {me.username}
                  </strong>
                  {/* </a> */}
                </Link>
              </li>
            )}
            <li className="nav-item me-3 me-lg-1">
              {!me && (
                <Link to="/login">
                  <button type="button" className="btn btn-link px-3 login">
                    Login
                  </button>
                </Link>
              )}
            </li>
            <li className="nav-item me-3 me-lg-1">
              {!me && (
                <Link to="/register">
                  <button type="button" className="btn btn-secondary">
                    Sign up
                  </button>
                </Link>
              )}
            </li>
            <DropdownButton
              id="dropdown-basic-button"
              title="Post"
              variant="light"
              className="border-bottom"
            >
              <Link to="/addLyrics">
                <Dropdown.Item href="#/action-1">Add song</Dropdown.Item>
              </Link>
              <Link to="/addBlog">
                <Dropdown.Item href="#/action-2">Add Blog</Dropdown.Item>
              </Link>
            </DropdownButton>

            {/* <li className="nav-item dropdown me-3 me-lg-1">
              <a
                className="nav-link dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="badge rounded-pill badge-notification bg-danger">
                  12
                </span>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Some news
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another news
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown me-3 me-lg-1">
              <a
                className="nav-link dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              ></a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Some news
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another news
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </nav>
    </>
  );
};
export default withRouter(Topnav);
