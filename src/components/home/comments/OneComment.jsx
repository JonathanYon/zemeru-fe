import { FaThumbsUp } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

const OneComment = () => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <p>Type your note, and hit enter to add it</p>

        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <img
              src="https://mdbootstrap.com/img/Photos/Avatars/img%20(4).jpg"
              alt="avatar"
              className="rounded-circle mr-1"
              style={{ width: "25px", height: "25px" }}
            />
            <p className="small mb-0 ms-2">Martha</p>
          </div>
          <div className="d-flex flex-row align-items-center">
            <p className="small text-muted mb-0">Upvote?</p>
            <FaThumbsUp className="mx-2" style={{ marginTop: "-0.16rem" }} />
            <p className="small text-muted mb-0">3</p>
            <FiEdit2 className="mx-1" />
            <MdDeleteForever />
          </div>
        </div>
      </div>
    </div>
  );
};
export default OneComment;
