import {
  Dropdown,
  DropdownButton,
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

const Topnav = (props) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("topnav");
    dispatch(myLogin());
  }, []);
  //---------------
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
    query.length > 2 && getAllLyrics();
  }, [query]);

  const me = useSelector((state) => state.user.me);

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

  const handleLogOut = () => {
    localStorage.clear();
    // localStorage.removeItem("Token");
    // localStorage.removeItem("persist:root");
    // props.history.push("/login");
    window.location.reload();
  };

  console.log("me", me);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid justify-content-between">
          <div className="d-flex">
            <Link
              to="/"
              className="navbar-brand me-2 mb-1 d-flex align-items-center"
            >
              <img
                // src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
                src={`${process.env.PUBLIC_URL}/logo.svg`}
                height="35"
                alt="logo"
                loading="lazy"
                style={{ marginTop: "2px" }}
              />
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
                  <img
                    src={me ? me.avatar : "https://picsum.photos/200"}
                    className="rounded-circle mr-2"
                    height="25"
                    width="25"
                    alt=""
                    loading="lazy"
                    style={{ objectFit: "cover" }}
                  />
                  <strong className="d-none d-sm-block ms-1">
                    {me.username}
                  </strong>
                </Link>
              </li>
            )}
            {me?.role === "Editor" && (
              <li className="nav-item me-3 me-lg-1">
                <Link
                  to="/adminPage"
                  className="nav-link d-sm-flex align-items-sm-center"
                >
                  <strong className="d-none d-sm-block ms-1">
                    Updated Lyrics
                  </strong>
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
            {me && (
              <DropdownButton
                id="dropdown-basic-button"
                title="Post"
                variant="light"
                className="border-bottom"
              >
                <Link to="/addLyrics">
                  <Dropdown.Item href="#/action-1">Add song</Dropdown.Item>
                </Link>
                {me?.role === "Editor" && (
                  <Link to="/addBlog">
                    <Dropdown.Item href="#/action-2">Add Blog</Dropdown.Item>
                  </Link>
                )}
              </DropdownButton>
            )}
            {me && (
              <button
                type="button"
                className="ml-1 btn border-bottom"
                onClick={handleLogOut}
              >
                Sign out
              </button>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};
export default withRouter(Topnav);
