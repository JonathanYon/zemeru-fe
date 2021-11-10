import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import "../chart.css";
import UserBio from "./UserBio";
import UserFeedCard from "./UserFeedCard";
import UserStatsCard from "./UserStats";
import { BsJournalText } from "react-icons/bs";

const User = ({ match }) => {
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oneUser, setOneUser] = useState(null);
  const [follow, setfollow] = useState(true);
  const [myComments, setMyComments] = useState(null);
  const [myCommentsBlog, setMyCommentsBlog] = useState(null);

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
  console.log("myComments", myComments);
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
  console.log("myCommentblog-", myCommentsBlog);

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

  return (
    <>
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
