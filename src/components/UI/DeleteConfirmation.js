import { Button, Modal } from "react-bootstrap";

const DeleteConfirmation = (props) => {
  return (
    <>
      <Modal
        show={props.showModal}
        onHide={() => {
          props.closeDeleteConfirmationModalHandler();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.closeDeleteConfirmationModalHandler();
            }}
          >
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              props.deleteConfirmHandler();
            }}
          >
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteConfirmation;
