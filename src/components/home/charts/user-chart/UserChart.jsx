import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Table,
  Spinner,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { myLyrics } from "../../../../Redux/action";
import { FaCoins } from "react-icons/fa";
import "../chart.css";
import { withRouter } from "react-router";

const UserChart = ({ history }) => {
  const contributer = useSelector((state) => state.allLyrics.lyrics);
  const loading = useSelector((state) => state.blogs.loading);
  const errors = useSelector((state) => state.blogs.error);
  const me = useSelector((state) => state.user.me);

  const userID = [...new Set(contributer.map((user) => user.userId))];
  const uniqueUser = (data, key) => {
    return [...new Map(data.map((x) => [key(x), x])).values()];
  };
  const editors = uniqueUser(userID, (it) => it._id);
  const userContrib = contributer.map((element) => {
    const holder = [];
    holder.push({
      title: element.title,
      username: element.userId.username,
      token: element.userId.token,
    });
    // return holder
    console.log("holder", editors);
  });
  // console.log("contributer", contributer);

  // console.log("unique", editors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myLyrics());
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h3>Top Contributors</h3>
          {loading && (
            <div className=" h-100 d-flex justify-content-center align-items-center">
              <Spinner animation="grow" className="mt-3" />
            </div>
          )}
          {errors && (
            <ListGroup className="mt-1 mx-5">
              <ListGroup.Item variant="danger">
                <strong>Something has gone wrong please come back again</strong>
              </ListGroup.Item>
            </ListGroup>
          )}
          <Table striped bordered hover>
            <tbody>
              {editors.map((user, i) => (
                <tr className="d-flex justify-content-between">
                  <td
                    onClick={() =>
                      user._id === me?._id
                        ? history.push(`/me`)
                        : history.push(`/user/${user._id}`)
                    }
                    className="user-chart-name"
                  >
                    {i + 1}.
                    <img
                      src={user.avatar}
                      alt="mezmur cover photo"
                      className="rounded-circle ml-3 mr-3"
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                      }}
                    />
                    {user.username}
                  </td>
                  <td className=" mr-5">
                    <FaCoins className="text-warning coin mr-2" />
                    <Badge variant="warning">{user.token}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default withRouter(UserChart);
