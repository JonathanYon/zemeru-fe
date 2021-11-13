import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Modal,
  ListGroup,
} from "react-bootstrap";
import "../chart.css";
import UserBio from "./UserBio";
import UserFeedCard from "./UserFeedCard";
import UserStatsCard from "./UserStats";
import { BsJournalText } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";
import Pusher from "pusher-js";
import { set } from "date-fns";

const User = ({ match }) => {
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oneUser, setOneUser] = useState(null);
  const [follow, setfollow] = useState(true);
  const [myComments, setMyComments] = useState(null);
  const [myCommentsBlog, setMyCommentsBlog] = useState(null);
  const [show, setShow] = useState(false);
  const [chatWithUser, setChatWithUser] = useState([]);
  const [message, setMessage] = useState("");
  const [clicked, setClicked] = useState(false);
  const [chatPusher, setChatPusher] = useState(null);
  const [feed, setFeed] = useState({
    allFeed: true,
    userFollowers: false,
    userFollowing: false,
  });
  // const [userFollowers, setUserFollowers] = useState(false);
  // const [userFollowing, setUserFollowing] = useState(false);

  const me = useSelector((state) => state.user.me);
  console.log("me", me);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const feedHandleShow = () =>
    setFeed({
      allFeed: true,
      userFollowers: false,
      userFollowing: false,
    });

  const followersHandleShow = () =>
    setFeed({
      allFeed: false,
      userFollowers: true,
      userFollowing: false,
    });

  const followingHandleShow = () =>
    setFeed({
      allFeed: false,
      userFollowers: false,
      userFollowing: true,
    });

  useEffect(() => {
    const getMyBlogComments = async () => {
      const { id } = match.params;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/users/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
            },
          }
        );
        if (response.ok) {
          const res = await response.json();
          setOneUser(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMyBlogComments();
  }, [follow]);
  console.log("user", oneUser);

  useEffect(() => {
    const getMyComments = async () => {
      const { id } = match.params;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/users/lyrics/comments/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
            },
          }
        );
        if (response.ok) {
          const res = await response.json();
          setMyComments(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMyComments();
  }, []);
  // console.log("myComments", myComments);
  const noOfComments = myComments?.commAndID
    .map((ele) => ele.comments)
    .flat().length;
  const noOfEdits = myComments?.myEdits.filter(
    (ele) => ele.userId === oneUser?._id
  ).length;

  useEffect(() => {
    const getMyBlogComments = async () => {
      const { id } = match.params;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/users/blogs/comments/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
            },
          }
        );
        if (response.ok) {
          const res = await response.json();
          setMyCommentsBlog(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMyBlogComments();
  }, []);
  // console.log("myCommentblog-", myCommentsBlog);

  //follow
  const followUsers = async (user) => {
    const payload = {
      userId: user,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/users/following/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        setfollow(!follow);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get chat with this user
  useEffect(() => {
    const getChatsWithUser = async () => {
      const { id } = match.params;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/messages/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
            },
          }
        );
        if (response.ok) {
          console.log("ok");
          const res = await response.json();
          setChatWithUser(res[0].messages);
        } else {
          alert("chat wrong??");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getChatsWithUser();
  }, [clicked, chatPusher]);
  console.log("getallchat**", chatWithUser);

  //Pusher
  // useEffect(() => {
  //   const pusher = new Pusher("0fb50def5b9d8d12554b", {
  //     cluster: "eu",
  //   });

  //   const channel = pusher.subscribe("messages");
  //   channel.bind("inserted", (newMessage) => {
  //     // alert(JSON.stringify(newMessage));
  //     setChatWithUser([...chatWithUser, newMessage]);
  //     setChatPusher(newMessage);
  //   });
  //   const channell = pusher.subscribe("messages");
  //   channell.bind("updated", (newMessage) => {
  //     // alert(JSON.stringify(newMessage));
  //     console.log("newMessage", newMessage);
  //     setChatWithUser([...chatWithUser, newMessage]);
  //     setChatPusher(newMessage);
  //   });

  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //     channell.unbind_all();
  //     channell.unsubscribe();
  //   };
  // }, [chatWithUser]);

  //post chat
  const startChatWithUser = async (e) => {
    e.preventDefault();
    const { id } = match.params;
    const payload = {
      message: message,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/messages/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        setClicked(!clicked);
        setMessage("");
        // const res = await response.json();

        // console.log(res);
        // alert("sent chat");
      } else {
        alert("chat wrong??");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="chat-modal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="position-relative  chat-modal ">
          <header className="page-header">
            <div className="container">
              <h6>{oneUser?.username}</h6>
            </div>
          </header>
          <div className="main">
            <div className="container ">
              <div className="chat-log">
                {chatWithUser &&
                  chatWithUser.map((chat) => (
                    <>
                      {" "}
                      {chat.from === oneUser?._id && (
                        <div className="chat-log__item">
                          <h3 className="chat-log__author">
                            {oneUser?.username}
                            <small>{chat.createdAt}</small>
                          </h3>
                          <div className="chat-log__message">
                            {chat.message}
                          </div>
                        </div>
                      )}
                      {chat.from === me?._id && (
                        <div className="chat-log__item chat-log__item--own">
                          <h3 className="chat-log__author">
                            {me?.username}
                            <small>{chat.createdAt}</small>
                          </h3>
                          <div className="chat-log__message">
                            {chat.message}
                          </div>
                        </div>
                      )}
                    </>
                  ))}
              </div>
            </div>
            <div className="position-relative">
              <div className="chat-form">
                <div className="container ">
                  <form
                    className="form-horizontal"
                    onSubmit={startChatWithUser}
                  >
                    <div className="row">
                      <div className="col-sm-10 col-xs-8">
                        <input
                          type="text"
                          className="form-control"
                          id=""
                          placeholder="Message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-2 col-xs-4 pl-0">
                        <button type="submit" className="btn btn-success ">
                          Send
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>

      <Container
        fluid
        className=" big-info-container"
        style={{
          backgroundImage: `url(${oneUser?.avatar})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "100% 100%",
          objectFit: "cover",
        }}
      >
        <Container className="info-container">
          <Row style={{ height: "40vh" }}>
            <Col>
              <Col className="position-relative d-flex">
                <div className="text-white mt-5 d-flex">
                  <img
                    src={oneUser?.avatar}
                    alt=""
                    className="mezmur-cover mt-5 rounded-circle"
                    style={{ height: "14vw", width: "14vw" }}
                  />
                </div>
              </Col>
            </Col>
            <Col className="mt-5 position-relative">
              <div className="follow d-flex mt-5">
                <div
                  className="mt-4 text-white mr-5 curser"
                  onClick={feedHandleShow}
                >
                  <BsJournalText className=" mr-1" />
                  <strong>Featured</strong>
                </div>
                <div
                  className="mt-4 text-white mr-3 curser"
                  onClick={followersHandleShow}
                >
                  <strong className="d-flex">
                    <span className="text-warning mr-1">
                      {oneUser?.followers.length}
                    </span>
                    <span>Followers</span>
                  </strong>
                </div>
                <div
                  className="mt-4 text-white mr-3 curser"
                  onClick={followingHandleShow}
                >
                  <strong className="d-flex">
                    <span className="text-warning mr-1">
                      {oneUser?.following.length}
                    </span>
                    <span>Following</span>
                  </strong>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container className="mt-5 mb-5">
        <Row>
          <Col xs={4}>
            <h5>
              @{oneUser?.username}
              <Badge variant="warning ml-1">{oneUser?.token}</Badge>
            </h5>
            <Button
              className="bg-light text-dark font-weight-bold mb-2"
              onClick={async () => followUsers(oneUser?._id)}
            >
              {follow ? "Follow" : "Following"}
            </Button>
            <Button
              className="bg-light text-dark font-weight-bold mb-2 ml-3"
              onClick={handleShow}
            >
              <FaEnvelope />
            </Button>
            <UserBio bio={oneUser?.bio} />
            <UserStatsCard
              commentNumber={noOfComments}
              lyricNum={myComments?.lyrics.length}
              editNum={noOfEdits}
            />
          </Col>
          {/* --------------------------------------------------------------------------- */}

          <Col xs={8}>
            {feed.allFeed && (
              <>
                {myComments?.commAndID.map((comment) => (
                  <UserFeedCard
                    comment={comment}
                    key={comment.id}
                    user={oneUser?.username}
                  />
                ))}
                {myCommentsBlog?.map((comment) => (
                  <UserFeedCard blogComment={comment} key={comment.id} />
                ))}
                {myComments?.lyrics &&
                  myComments?.lyrics?.map((lyr) => (
                    <UserFeedCard lyrIwrite={lyr} user={oneUser?.username} />
                  ))}
              </>
            )}
            {feed.userFollowing && (
              <ListGroup variant="flush" className="bg-transparent text-left">
                {oneUser?.following.length > 0 ? (
                  oneUser?.following.map((user) => (
                    <ListGroup.Item
                      key={user.userId._id}
                      className="follow-list-bg"
                    >
                      <img
                        src={user.userId.avatar}
                        className="rounded-circle mr-2"
                        height="23"
                        width="23"
                        alt=""
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />{" "}
                      {user.userId.username}
                      <small className="ml-1 follow-token-num">
                        {user.userId.token}
                      </small>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item className="follow-list-bg">
                    <strong>{oneUser?.username}</strong> hasn't followed anyone
                    yet!
                  </ListGroup.Item>
                )}
              </ListGroup>
            )}
            {feed.userFollowers && (
              <ListGroup variant="flush" className="bg-transparent text-left">
                {oneUser?.followers.length > 0 ? (
                  oneUser?.followers.map((user) => (
                    <ListGroup.Item
                      key={user.userId._id}
                      className="follow-list-bg"
                    >
                      <img
                        src={user.userId.avatar}
                        className="rounded-circle mr-1"
                        height="23"
                        width="23"
                        alt=""
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />{" "}
                      {user.userId.username}
                      <small className="ml-1 follow-token-num">
                        {user.userId.token}
                      </small>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item className="follow-list-bg">
                    <strong>{oneUser?.username}</strong> doesn't have any
                    followers yet!
                  </ListGroup.Item>
                )}
              </ListGroup>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default User;
