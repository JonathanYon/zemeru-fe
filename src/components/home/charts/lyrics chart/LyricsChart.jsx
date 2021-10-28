import { Col, Container, Row, Table } from "react-bootstrap";

const LyricsChart = () => {
  
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h3>Top Searched Lyrics</h3>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default LyricsChart;
