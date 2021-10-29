import OneComment from "./OneComment";

const Comments = () => {
  return (
    <div className="row d-flex justify-content-center">
      <div>
        <div
          className="card shadow-0 border"
          style={{ backgroundColor: "#f0f2f5" }}
        >
          <div className="card-body p-4">
            <div className="form-outline mb-4">
              <input
                type="text"
                id="addANote"
                className="form-control"
                placeholder="Type comment..."
              />
              <label className="form-label" for="addANote">
                + Add a note
              </label>
            </div>

            <OneComment />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Comments;
