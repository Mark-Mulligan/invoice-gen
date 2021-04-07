import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment } from "@material-ui/core";
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
  const [lessonCost, setLessonCost] = useState(20);

  useEffect(() => {
    if (studentInfo) {
      setName(studentInfo?.name);
      setParentName(studentInfo?.parentName);
      setParentEmail(studentInfo?.parentEmail);
      setParentPhone(studentInfo?.parentPhone);
      setSchool(studentInfo?.school);
      setLessonCost(studentInfo?.lessonCost);
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
      lessonCost
    };

    const editStudentInfo = {
      studentId: studentInfo?._id,
      name,
      parentName,
      parentEmail,
      parentPhone,
      school,
      lessonCost
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
  };

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
            <Modal.Title>{editStudentModal && "Edit Student"}{addStudentModal && "Add Student"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <TextField
                required
                size="small"
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
                size="small"
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
                size="small"
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
                size="small"
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
                size="small"
                fullWidth
                id="school-input"
                label="School"
                variant="outlined"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="">
              <FormControl size="small" fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-price">
                  Lesson Cost
                </InputLabel>
                <OutlinedInput
                  required
                  type="number"
                  id="outlined-adornment-price"
                  value={lessonCost}
                  onChange={(e) => setLessonCost(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  labelWidth={90}
                />
              </FormControl>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-start">
            <Button variant="dark" type="submit">
              {submitButtonName}
            </Button>
            {editStudentModal && (
              <Confirm 
                onConfirm={() => handleDeleteClick(studentInfo)} 
                buttonVariant="dark"
                buttonText="Delete Student"
                message="Are you sure you want to delete this student?"
                />
            )}
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
