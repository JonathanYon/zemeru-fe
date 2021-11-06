import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Table,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { myLyrics } from "../../../../Redux/action";

const UserChart = () => {
  const contributer = useSelector((state) => state.allLyrics.lyrics);
  const loading = useSelector((state) => state.blogs.loading);
  const errors = useSelector((state) => state.blogs.error);

  const userID = [...new Set(contributer.map((user) => user.userId))];
  const uniqueUser = (data, key) => {
    return [...new Map(data.map((x) => [key(x), x])).values()];
  };
  const editors = uniqueUser(userID, (it) => it._id);
  const userContrib = contributer.map((element) => {
    const holder = [];
    holder.push({ title: element.title, username: element.userId.username });
    // return holder
    console.log(holder);
  });
  // console.log("repeate", contributer);

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
                <tr>
                  <td>
                    {/* {i + 1} */}
                    {i + 1}.
                    <img
                      src={user.avatar}
                      alt="mezmur cover photo"
                      className="rounded-circle ml-1"
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td colSpan="2">{user.username}</td>
                  <td>@twitter</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default UserChart;
