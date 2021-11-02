import { useState, useEffect } from "react";
import OneComment from "./OneComment";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getComments } from "../../../Redux/action";
import { useSelector } from "react-redux";

const Comments = (props) => {
  const [comment, setComment] = useState("");
  const comments = useSelector((state) => state.lyricsComments.comments);
  const dispatch = useDispatch();
  useEffect(() => {
    const { id } = props.match.params;
    dispatch(getComments(id));
  }, []);

  const submitComment = async (e) => {
    e.preventDefault();
    const { id } = props.match.params;
    const payload = {
      comment,
    };
    try {
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
        comments.unshift(resp);
        setComment("");
      } else {
        alert("something Wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
