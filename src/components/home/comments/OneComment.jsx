import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaThumbsUp } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";

const OneComment = ({ match, comment }) => {
  const [update, setUpdate] = useState(false);
  const [editComment, setEditComment] = useState(comment.comment);
  const me = useSelector((state) => state.user.me?._id);

  const deleteComment = async (commentID) => {
    try {
      const { id } = match.params;
      const response = await fetch(
        `${process.env.REACT_APP_URL}/lyrics/post/${id}/comments/${commentID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Delete");
        // const resp = await response.json()
      } else {
        alert("somethin wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //---------update

  const updateComment = async (commentID) => {
    // e.preventDefault();
    try {
      const payload = {
        comment: editComment,
      };
      const { id } = match.params;
      const response = await fetch(
        `${process.env.REACT_APP_URL}/lyrics/post/${id}/comments/${commentID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
          method: "PUT",
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        alert("Update");
        // const resp = await response.json()
      } else {
        alert("somethin wrong in update");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("1comment", comment.userId);
  return (
    <>
      {update ? (
        <>
          {/* <form
        onSubmit={() => updateComment(comment._id)}
        > */}
          <input
            type="text"
            id="editComment"
            className="form-control"
            placeholder="Type comment..."
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
          />
          <Button
            className="form-label mt-2"
            for="addANote"
            onClick={() => updateComment(comment._id)}
          >
            Edit
          </Button>
          <Button
            className="form-label mt-2 ml-1"
            onClick={() => setUpdate(false)}
          >
            cancel
          </Button>
          {/* </form> */}
        </>
      ) : (
        <div className="card mb-4">
          <div className="card-body">
            <p>{comment.comment}</p>

            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <img
                  // src="https://mdbootstrap.com/img/Photos/Avatars/img%20(4).jpg"
                  src={comment.userId.avatar}
                  alt="avatar"
                  className="rounded-circle mr-1"
                  style={{ width: "25px", height: "25px", objectFit: "cover" }}
                />
                <p className="small mb-0 ms-2">{comment.userId.username}</p>
              </div>
              <div className="d-flex flex-row align-items-center">
                <FaThumbsUp
                  className="mx-2"
                  style={{ marginTop: "-0.16rem" }}
                />
                <p className="small text-muted mb-0">3</p>
                {me === comment.userId._id && (
                  <FiEdit2 className="mx-1" onClick={() => setUpdate(true)} />
                )}
                {me === comment.userId._id && (
                  <MdDeleteForever onClick={() => deleteComment(comment._id)} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default withRouter(OneComment);
