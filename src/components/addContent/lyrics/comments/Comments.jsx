import { Spinner, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import OneComment from "./OneComment";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getComments } from "../../../../Redux/action";
import { useSelector } from "react-redux";

const Comments = (props) => {
  const [comment, setComment] = useState("");
  const [commentClick, setCommentClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
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
      setLoading(true);
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
        setLoading(false);
        dispatch(getComments(id));
        setComment("");
      } else {
        setLoading(false);
        setErrors(true);
      }
    } catch (error) {
      setLoading(false);
      setErrors(true);
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
      {errors && (
        <ListGroup className="mt-1 mx-5">
          <ListGroup.Item variant="danger">
            <strong>Something has gone wrong please come back again</strong>
          </ListGroup.Item>
        </ListGroup>
      )}
      <div className="card-body p-4">
        <div className="form-outline mb-4">
          <form onSubmit={submitComment}>
            <input
              type="text"
              id="addANote"
              className="form-control"
              placeholder="Type comment..."
              value={comment}
              onClick={() => setCommentClick(true)}
              onChange={(e) => setComment(e.target.value)}
            />
            {commentClick && (
              <Button
                className="form-label mt-2 mr-2 text-dark bg-light font-weight-bold"
                for="addANote"
                type="submit"
              >
                comment
              </Button>
            )}
            {commentClick && (
              <Button
                className="form-label mt-2 text-black-50 bg-light font-weight-bold"
                for="addANote"
                type="submit"
                onClick={() => setCommentClick(false)}
              >
                cancel
              </Button>
            )}
          </form>
          {loading && <Spinner animation="grow" className="mt-3" />}
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
