import { Row, Card, Container, Col } from "react-bootstrap";
import { useCakeStore } from "../store/cakeStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllCakes = () => {
  const allCakes = useCakeStore((state) => state.cakeData);
  const getCakesAPICall = useCakeStore((state) => state.getCakesAPICall);
  const navigate = useNavigate();

  useEffect(() => {
    if (allCakes.length == 0) {
      getCakesAPICall();
    }
  }, []);

  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-4 offset-md-4">
            <Button
              variant="primary"
              type="button"
              onClick={() => {
                navigate("/add-cake");
              }}
            >
              Add
            </Button>
          </Col>
        </Row>
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
};

export default AllCakes;
