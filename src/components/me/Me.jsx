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
import FeedCard from "./card/FeedCard";
import LeftCard from "./card/LeftCard";
import StatsCard from "./card/StatsCard";
import "./me.css";

const Me = ({ me }) => {
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myComments, setmyComments] = useState(null);
  const [myCommentsBlog, setmyCommentsBlog] = useState(null);

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

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
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
              <div className="follow d-flex mt-5">
                <div className="mt-4 text-white mr-5">
                  <strong>Featured</strong>
                </div>
                <div className="mt-4 text-white mr-3">
                  <strong className="d-flex">
                    <span className="text-warning mr-1">
                      {me.followers.length}
                    </span>
                    <span>Followers</span>
                  </strong>
                </div>
                <div className="mt-4 text-white mr-3">
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
            <LeftCard bio={me.bio} />
            <StatsCard
              commentNumber={noOfComments}
              lyricNum={myComments?.lyrics.length}
              editNum={noOfEdits}
            />
          </Col>
          <Col xs={8}>
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
              myComments?.lyrics?.map((lyr) => <FeedCard lyrIwrite={lyr} />)}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Me;
