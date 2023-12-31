import React, { useRef } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useCakeStore } from "../store/cakeStore";
import { useNavigate } from "react-router-dom";

function AddCake() {
  const name = useRef("");
  const cost = useRef("");
  const imgUrl = useRef("");
  const addCakeApiCall = useCakeStore((state) => state.addCakeAPI);
  const navigate = useNavigate();

  const addCakeHandler = async () => {
    let payload = {
      name: name.current.value,
      cost: Number(cost.current.value),
      imageUrl: imgUrl.current.value,
    };
    await addCakeApiCall(payload);
    navigate("/view-cake");
  };

  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-8 offset-md-2">
            <legend>Create a New Dessert</legend>
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
              <Form.Control type="text" ref={imgUrl} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={addCakeHandler}>
              Add
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddCake;
