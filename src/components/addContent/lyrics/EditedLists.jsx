import { Button } from "react-bootstrap";
import { withRouter } from "react-router";

const EditedLists = ({ match, history }) => {
  const deleteUserEdit = async () => {
    //edited/:lId/lyrics/:eId
    const { lId, eId } = match.params;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/lyrics/approve/${lId}/admin/${eId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        history.push("/adminPage");
        alert("Deleted");
      } else {
        alert("something wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //-------------------------
  const updateUserEdit = async () => {
    //edited/:lId/lyrics/:eId
    const { lId, eId } = match.params;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/lyrics/approve/${lId}/admin/${eId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        history.push("/adminPage");
        alert("Updated");
      } else {
        alert("something wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h3>click blow to Approve and modify the Lyrics</h3>
        <Button className="bg-success" onClick={updateUserEdit}>
          Approve
        </Button>
      </div>
      <div>
        <h3>click blow to Reject and Delete the proposed Edit by the user.</h3>
        <Button className="bg-danger" onClick={deleteUserEdit}>
          Reject
        </Button>
      </div>
    </div>
  );
};
export default withRouter(EditedLists);
