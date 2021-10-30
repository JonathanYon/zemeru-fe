import { useState, useEffect } from "react";
import OneComment from "./OneComment";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";

const Comments = (props) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const submitComment = async (e) => {
    e.preventDefault();
    const payload = {
      comment,
    };
    try {
      const { id } = props.match.params;
      const response = await fetch(
        `${process.env.REACT_APP_URL}/lyrics/post/${id}`,
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
        // alert("commented");
        const resp = await response.json();
        setComments(comments.concat(resp));
        setComment("");
      } else {
        alert("something Wrong");
      }
    } catch (error) {
      console.log(error);
    }
    //-------------------------------------------------------------------
    const getComments = async () => {
      try {
        const { id } = props.match.params;
        const response = await fetch(
          `${process.env.REACT_APP_URL}/lyrics/post/${id}/comments`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
            },
          }
        );
        if (response.ok) {
          const res = await response.json();
          setComments(res);
        } else {
          alert("something Wrong");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  };
  // useEffect(() => {

  // }, []);

  return (
    // <div className="row d-flex justify-content-center">
    //   <div>
    <div
      className="card shadow-0 border"
      style={{ backgroundColor: "#f0f2f5" }}
    >
      <div className="card-body p-4">
        <div className="form-outline mb-4">
          <form onSubmit={submitComment}>
            <input
              type="text"
              id="addANote"
              className="form-control"
              placeholder="Type comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button className="form-label mt-2" for="addANote" type="submit">
              comment
            </Button>
          </form>
        </div>
        {comments.map((aComment) => (
          <OneComment comment={aComment} key={aComment._id} />
        ))}
      </div>
    </div>
    //   </div>
    // </div>
  );
};
export default withRouter(Comments);
