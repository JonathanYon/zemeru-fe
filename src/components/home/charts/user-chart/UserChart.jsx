import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { myLyrics } from "../../../../Redux/action";

const UserChart = () => {
  const contributer = useSelector((state) => state.allLyrics.lyrics);

  const userID = [...new Set(contributer.map((user) => user.userId))];
  const uniqueUser = (data, key) => {
    return [...new Map(data.map((x) => [key(x), x])).values()];
  };
  const editors = uniqueUser(userID, (it) => it._id);
  console.log("repeate", userID);
  console.log("unique", editors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myLyrics());
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h3>Top Contribiuters</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th colSpan="2">First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {editors.map((user, i) => (
                <tr>
                  <td>{i + 1}</td>
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
