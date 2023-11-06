import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCakeById, useCakeStore } from "../../store/cakeStore";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const EditCake = () => {
  const { id } = useParams();
  const cakeToEdit = useCakeStore(getCakeById(id));
  const name = useRef("");
  const cost = useRef("");
  const imageUrl = useRef("");
  const updateAPICall = useCakeStore((state) => state.updateCakeAPI);
  const navigate = useNavigate();

  useEffect(() => {
    if (cakeToEdit) {
      name.current.value = cakeToEdit.name;
      cost.current.value = cakeToEdit.cost;
      imageUrl.current.value = cakeToEdit.imageUrl;
    }
  }, [cakeToEdit]);

  const updateCakeHandler = async () => {
    let payload = {
      name: name.current.value,
      cost: Number(cost.current.value),
      imageUrl: imageUrl.current.value,
      id: Number(id),
    };
    await updateAPICall(payload);
    navigate("/view-cake");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container className="mt-2">
      <Row>
        <Col className="col-md-8 offset-md-2">
          <legend>Update a Dessert</legend>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={name} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCost">
            <Form.Label>Cost</Form.Label>
            <Form.Control type="text" ref={cost} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formImgUrl">
            <Form.Label>Image Url</Form.Label>
            <Form.Control type="text" ref={imageUrl} />
          </Form.Group>
          <Button variant="primary" type="button" onClick={updateCakeHandler}>
            Update
          </Button>{" "}
          <Button variant="danger" type="button" onClick={handleGoBack}>
            Go Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EditCake;
