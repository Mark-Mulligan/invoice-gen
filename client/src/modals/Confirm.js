import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function Confirm(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirm = () => {
    props.onConfirm();
    handleClose();
  };

  return (
    <>
      <Button variant={props.buttonVariant} onClick={handleShow}>
        {props.googleButton && <i className="fab fa-google mr-1"></i>}
        {props.buttonText}
      </Button>
        <Modal
          size="sm"
          className="confirm-modal"
          centered
          show={show}
          onHide={handleClose}
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onFocus={(e) => e.stopPropagation()}
          onMouseOver={(e) => e.stopPropagation()}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {props.message}
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer className="justify-content-start">
            <Button onClick={handleConfirm} variant="dark">
              Yes
            </Button>
            <Button variant="outline-dark" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default Confirm;
