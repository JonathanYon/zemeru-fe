import { useState, useEffect } from "react";
import BlogOneComment from "./BlogOneComment";
import { withRouter } from "react-router";
import { Button, Spinner, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getBlogComments } from "../../../../../Redux/action";

const BlogComments = (props) => {
  const [comment, setComment] = useState("");
  const [commentClick, setCommentClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const comments = useSelector((state) => state.blogsComments.comments);
  const dispatch = useDispatch();
  useEffect(() => {
    const { id } = props.match.params;
    dispatch(getBlogComments(id));
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
        `${process.env.REACT_APP_URL}/blogs/post/${id}`,
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
        // alert("commented");
        const resp = await response.json();
        comments.unshift(resp);
        setComment("");
      } else {
        setLoading(false);
        setErrors(true);
        alert("something Wrong");
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
      {loading && <Spinner animation="grow" className="mt-3" />}
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
        </div>
        {comments.map((aComment) => (
          <BlogOneComment comment={aComment} key={aComment._id} />
        ))}
      </div>
    </div>
    //   </div>
    // </div>
  );
};
export default withRouter(BlogComments);
