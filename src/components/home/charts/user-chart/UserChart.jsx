import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";

const UserChart = () => {
  const [contributer, setContributer] = useState([]);

  useEffect(() => {
    const getContributers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/lyrics/all`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
            },
          }
        );
        if (response.ok) {
          const res = await response.json();
          console.log("users", res);
          setContributer(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getContributers();
  }, []);

  contributer.map((user) => console.log(user.userId));

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
              <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default UserChart;
