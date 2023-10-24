import { Row, Card, Container, Col } from "react-bootstrap";
import { useCakeStore } from "../store/cakeStore";

function AllCakes() {
  const allCakes = useCakeStore((state) => state.cakeData);
  return (
    <>
      <Container className="mt-2">
        <Row xs={1} md={3} className="g-4">
          {allCakes.map((cake) => (
            <Col key={cake.id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={cake.imageUrl}
                  style={{ height: 400, width: "100%" }}
                />
                <Card.Body>
                  <Card.Title>{cake.name}</Card.Title>
                  <Card.Text>Price - {cake.cost}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default AllCakes;
