import { Row, Card, Container, Col, Button } from "react-bootstrap";
import { useCakeStore } from "../store/cakeStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";

const AllCakes = () => {
  const allCakes = useCakeStore((state) => state.cakeData);
  const getCakesAPICall = useCakeStore((state) => state.getCakesAPI);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(0);
  const deleteCakeApiCall = useCakeStore((state) => state.deleteCakeAPI);

  useEffect(() => {
    if (allCakes.length == 0) {
      getCakesAPICall();
    }
  }, []);

  const openDeleteConfirmationModalHandler = (id) => {
    setItemIdToDelete(id);
    setShowModal(true);
  };

  const closeDeleteConfirmationModalHandler = () => {
    setItemIdToDelete(0);
    setShowModal(false);
  };

  const deleteConfirmHandler = async () => {
    await deleteCakeApiCall(itemIdToDelete);
    setItemIdToDelete(0);
    setShowModal(false);
  };

  return (
    <>
      <DeleteConfirmation
        showModal={showModal}
        title="Delete Confirmation"
        body="Are you sure to delete this item?"
        closeDeleteConfirmationModalHandler={
          closeDeleteConfirmationModalHandler
        }
        deleteConfirmHandler = {deleteConfirmHandler}
      ></DeleteConfirmation>
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
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => navigate(`/edit-cake/${cake.id}`)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => openDeleteConfirmationModalHandler(cake.id)}
                  >
                    Delete
                  </Button>
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
