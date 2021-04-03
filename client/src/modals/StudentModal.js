import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import axios from "axios";
import Confirm from "../modals/Confirm";

const StudentModal = ({
  userId,
  submitButtonName,
  studentInfo,
  showStudentModal,
  hideModal,
  afterSubmit,
  addStudentModal,
  editStudentModal,
}) => {
  const [name, setName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [school, setSchool] = useState("");

  useEffect(() => {
    if (editStudentModal) {
      setName(studentInfo?.name);
      setParentName(studentInfo?.parentName);
      setParentEmail(studentInfo?.parentEmail);
      setParentPhone(studentInfo?.parentPhone);
      setSchool(studentInfo?.school);
    }
  }, [studentInfo]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const addStudentInfo = {
      userGoogleId: userId,
      name,
      parentName,
      parentEmail,
      parentPhone,
      school,
    };

    const editStudentInfo = {
      studentId: studentInfo?._id,
      name,
      parentName,
      parentEmail,
      parentPhone,
      school,
    };

    if (addStudentModal) {
      addStudent(addStudentInfo);
    } else if (editStudentModal) {
      editStudent(editStudentInfo);
    }
  };

  const addStudent = (studentInfo) => {
    axios
      .post("/api/students", studentInfo)
      .then((response) => {
        console.log(response);
        setName("");
        setParentName("");
        setParentEmail("");
        setParentPhone("");
        setSchool("");
        hideModal();
        afterSubmit();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const editStudent = (studentInfo) => {
    console.log(studentInfo);
    axios
      .put("/api/students", studentInfo)
      .then((response) => {
        console.log(response);
        setName("");
        setParentName("");
        setParentEmail("");
        setParentPhone("");
        setSchool("");
        hideModal();
        afterSubmit();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDeleteClick = (studentInfo) => {
    axios
      .delete(`/api/students?studentid=${studentInfo._id}`)
      .then((response) => {
        console.log(response);
        hideModal();
        afterSubmit();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Modal
        backdrop="static"
        show={showStudentModal}
        onHide={hideModal}
        onKeyDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        onMouseOver={(e) => e.stopPropagation()}
      >
        <form onSubmit={onFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <TextField
                required
                fullWidth
                id="student-name-input"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <TextField
                required
                fullWidth
                id="parent-name-input"
                label="Parent Name"
                variant="outlined"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <TextField
                required
                fullWidth
                id="parent-email-input"
                label="Parent Email"
                variant="outlined"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                id="parente-phone-input"
                label="Parent Phone"
                variant="outlined"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                id="school-input"
                label="School"
                variant="outlined"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                autoComplete="off"
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-start">
            <Button variant="dark" type="submit">
              {submitButtonName}
            </Button>
            {editStudentModal && <Confirm onConfirm={() => handleDeleteClick(studentInfo)} />}
            <Button variant="outline-dark" onClick={hideModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default StudentModal;
