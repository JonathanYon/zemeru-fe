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
