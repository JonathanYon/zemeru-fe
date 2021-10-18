import { Col, Container, Row, Table } from "react-bootstrap";

const UserChart = () => {
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
