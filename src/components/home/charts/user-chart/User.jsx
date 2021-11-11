import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Badge, Modal } from "react-bootstrap";
import "../chart.css";
import UserBio from "./UserBio";
import UserFeedCard from "./UserFeedCard";
import UserStatsCard from "./UserStats";
import { BsJournalText } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  // console.log("user", oneUser);

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
          setChatWithUser(res);
        } else {
          alert("chat wrong??");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getChatsWithUser();
  }, [message]);
  console.log("getallchat**", chatWithUser);

  //post chat
  const startChatWithUser = async () => {
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
        const res = await response.json();
        console.log(res);
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
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Conversation with ?</Modal.Title> */}
        </Modal.Header>
        <Modal.Body class=" position-relative">
          {/* <div>hello</div>
          <form>
            <input
              type="text"
              id="addANote"
              className="form-control"
              placeholder="Type your message here..."
              value={message}
              // onClick={() => setCommentClick(true)}
              onChange={(e) => setMessage(e.target.value)}
            />
          </form> */}
          <header class="page-header">
            <div class="container ">
              <h2>Felipe</h2>
            </div>
          </header>
          <div class="main">
            <div class="container ">
              <div class="chat-log">
                <div class="chat-log__item">
                  <h3 class="chat-log__author">
                    Felipe <small>14:30</small>
                  </h3>
                  <div class="chat-log__message">Yo man</div>
                </div>
                <div class="chat-log__item chat-log__item--own">
                  <h3 class="chat-log__author">
                    Fabrício <small>14:30</small>
                  </h3>
                  <div class="chat-log__message">BRB</div>
                </div>
              </div>
            </div>
            <div className="position-relative">
              <div class="chat-form">
                <div class="container ">
                  <form class="form-horizontal">
                    <div class="row">
                      <div class="col-sm-10 col-xs-8">
                        <input
                          type="text"
                          class="form-control"
                          id=""
                          placeholder="Message"
                        />
                      </div>
                      <div class="col-sm-2 col-xs-4">
                        <button type="submit" class="btn btn-success btn-block">
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
                <div className="mt-4 text-white mr-5">
                  <BsJournalText className=" mr-1" />
                  <strong>Featured</strong>
                </div>
                <div className="mt-4 text-white mr-3">
                  <strong className="d-flex">
                    <span className="text-warning mr-1">
                      {oneUser?.followers.length}
                    </span>
                    <span>Followers</span>
                  </strong>
                </div>
                <div className="mt-4 text-white mr-3">
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
          <Col xs={8}>
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
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default User;
