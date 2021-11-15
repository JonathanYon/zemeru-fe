import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { BiPencil } from "react-icons/bi";
import { FaEnvelope } from "react-icons/fa";
import { BsJournalText } from "react-icons/bs";
import FeedCard from "./card/FeedCard";
import LeftCard from "./card/LeftCard";
import StatsCard from "./card/StatsCard";
import "./me.css";

const Me = ({ me }) => {
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [show, setShow] = useState(false);
  const [see, setSee] = useState(false);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myComments, setmyComments] = useState(null);
  const [myChats, setmyChats] = useState([]);
  const [myCommentsBlog, setmyCommentsBlog] = useState(null);
  const [feed, setFeed] = useState({
    allFeed: true,
    myFollowers: false,
    myFollowing: false,
  });

  const feedHandleShow = () =>
    setFeed({
      allFeed: true,
      myFollowers: false,
      myFollowing: false,
    });

  const followersHandleShow = () =>
    setFeed({
      allFeed: false,
      myFollowers: true,
      myFollowing: false,
    });

  const followingHandleShow = () =>
    setFeed({
      allFeed: false,
      myFollowers: false,
      myFollowing: true,
    });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEnd = () => setSee(false);
  const handleStart = () => setSee(true);

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
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        // alert("Sent");
      } else {
        // alert("something wrong");
        setErrors(true);
        setTimeout(() => {
          setErrors(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //bio
  const updateBio = async () => {
    // e.preventDefault();
    try {
      if (bio && avatar) {
        const payload = {
          bio: bio,
        };

        // const { id } = match.params;
        const response = await fetch(`${process.env.REACT_APP_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
          method: "PUT",
          body: JSON.stringify(payload),
        });

        addAvatar();

        if (response.ok) {
          alert("Updated both");
          // const resp = await response.json()
        } else {
          alert("somethin wrong in update");
        }
      } else if (bio) {
        const payload = {
          bio: bio,
        };
        const response = await fetch(`${process.env.REACT_APP_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
          method: "PUT",
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          alert("Update bio only");
          // const resp = await response.json()
        } else {
          alert("somethin wrong in update");
        }
      } else if (avatar) {
        addAvatar();
        alert("Update avatar only");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getMyComments = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/users/lyrics/comments/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
            },
          }
        );
        if (response.ok) {
          const res = await response.json();
          setmyComments(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMyComments();
  }, []);
  // console.log("myComment", myComments);
  const noOfComments = myComments?.commAndID
    .map((ele) => ele.comments)
    .flat().length;
  const noOfEdits = myComments?.myEdits.filter(
    (ele) => ele.userId === me?._id
  ).length;

  useEffect(() => {
    const getMyBlogComments = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/users/blogs/comments/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
            },
          }
        );
        if (response.ok) {
          const res = await response.json();
          setmyCommentsBlog(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMyBlogComments();
  }, []);
  console.log("myCommentblog", myCommentsBlog);

  //get chat with this user
  useEffect(() => {
    const getAllMyChats = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/messages`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        });
        if (response.ok) {
          console.log("ok");
          const res = await response.json();
          setmyChats(res);
        } else {
          alert("chat wrong??");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllMyChats();
  }, []);
  console.log("mychat---", myChats);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Update Bio/Avatar</Modal.Title>
          {loading && (
            <ListGroup>
              <ListGroup.Item variant="success">
                you have updated your profile Successfully
              </ListGroup.Item>
            </ListGroup>
          )}
          {errors && (
            <ListGroup>
              <ListGroup.Item variant="danger">
                Something has gone wrong try again later
              </ListGroup.Item>
            </ListGroup>
          )}
        </Modal.Header>
        <Modal.Body>
          <div>
            <form encType="multipart/form-data" action="">
              <textarea
                name="bio"
                id=""
                cols="30"
                rows="10"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <input
                id="id-for-upload-file"
                type="file"
                onChange={imageHandler}
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={updateBio}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={see} onHide={handleEnd}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {myChats.map((chat) => (
              <ListGroup.Item variant="success" key={chat._id}>
                {/* <div className="d-flex justify-content-between">
                  <div>
                    <img
                      src=""
                      className="rounded-circle mr-2"
                      height="23"
                      width="23"
                      alt=""
                      loading="lazy"
                      style={{ objectFit: "cover" }}
                    />
                    <small>{chat.messages[0].message}</small>
                  </div>
                  <small>{chat.createdAt}</small>
                </div> */}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>

      <Container
        fluid
        className=" big-info-container"
        style={{
          backgroundImage: `url(${me?.avatar})`,
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
                    src={me?.avatar}
                    alt=""
                    className="mezmur-cover mt-5 rounded-circle"
                    style={{ height: "14vw", width: "14vw" }}
                  />
                </div>
              </Col>
            </Col>
            <Col className="mt-5 position-relative">
              <div className="follow d-flex mt-5 curser">
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
                      {me.followers.length}
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
                      {me.following.length}
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
              @{me?.username}
              <Badge variant="warning ml-1">{me.token}</Badge>
            </h5>
            <Button
              className="bg-light text-black-50 mb-2"
              onClick={handleShow}
            >
              <BiPencil />
              Edit
            </Button>
            <Button
              className="bg-light text-dark font-weight-bold mb-2 ml-3"
              onClick={handleStart}
            >
              <FaEnvelope />
            </Button>
            <LeftCard bio={me.bio} />
            <StatsCard
              commentNumber={noOfComments}
              lyricNum={myComments?.lyrics.length}
              editNum={noOfEdits}
            />
          </Col>
          <Col xs={8}>
            {feed.allFeed && (
              <>
                {myComments?.commAndID.map((comment) => (
                  <FeedCard
                    comment={comment}
                    key={comment.id}
                    // lyrIwrite={myComments.lyrics}
                  />
                ))}
                {myCommentsBlog?.map((comment) => (
                  <FeedCard blogComment={comment} key={comment.id} />
                ))}
                {myComments?.lyrics &&
                  myComments?.lyrics?.map((lyr) => (
                    <FeedCard lyrIwrite={lyr} />
                  ))}
              </>
            )}
            {feed.myFollowing && (
              <ListGroup variant="flush" className="bg-transparent text-left">
                {me?.following.length > 0 ? (
                  me?.following.map((user) => (
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
                    <strong>You</strong> haven't followed anyone yet!
                  </ListGroup.Item>
                )}
              </ListGroup>
            )}
            {feed.myFollowers && (
              <ListGroup variant="flush" className="bg-transparent text-left">
                {me?.followers.length > 0 ? (
                  me?.followers.map((user) => (
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
                    <strong>You</strong> doesn't have any followers yet!
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
export default Me;
