import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import axios from "axios";

const EditProfileModal = (props) => {
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [phoneNumber, setPhoneNumber] = useState(props.phone);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const userInfo = {
      googleId: props.googleId,
      name,
      email,
      phoneNumber,
    };

    axios
      .put("/api/user", userInfo)
      .then((response) => {
        console.log(response);
        props.getUserData();
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <button className="btn btn-outline-dark" onClick={handleShow}>
        Edit Information
      </button>
      <Modal
        backdrop="static"
        show={show}
        onHide={handleClose}
        onKeyDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        onMouseOver={(e) => e.stopPropagation()}
      >
        <form onSubmit={onFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <TextField
                required
                fullWidth
                id="name-input"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete='off'
              />
            </div>
            <div className="mb-3">
              <TextField
                required
                fullWidth
                id="email-input"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div>
              <TextField
                fullWidth
                id="phone-input"
                label="Phone"
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                autoComplete="off"
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-start">
            <Button variant="dark" type="submit">
              Submit Changes
            </Button>
            <Button variant="outline-dark" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditProfileModal;
