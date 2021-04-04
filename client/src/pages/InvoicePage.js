import React, { useEffect, useState } from "react";
import DateInput from "../inputs/DataInput";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";

const InvoicePage = (props) => {
  const [userStudents, setUserStudents] = useState("");

  const [student, setStudent] = useState("");
  const [yourName, setYourName] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [yourNumber, setYourNumber] = useState("");
  const [months, setMonths] = useState([]);

  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");

  const getUserStudents = () => {
    axios
      .get(`/api/students?userid=${props.userId}`)
      .then((response) => {
        setUserStudents(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserData = () => {
    axios
      .get(`/api/user?userid=${props.userId}`)
      .then((response) => {
        const user = response.data.data[0];
        setYourName(user.name);
        setYourEmail(user.email);
        setYourNumber(user.phoneNumber);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onStudentSelect = (event) => {
    const selectedStudent = userStudents[event.target.value];
    setStudent(event.target.value);
    setStudentName(selectedStudent?.name);
    setParentName(selectedStudent?.parentName);
    setParentEmail(selectedStudent?.parentEmail);
    setParentPhone(selectedStudent?.parentPhone);
  };

  useEffect(() => {
    if (props.isSignedIn === false) {
      props.history.push("/");
    }
  }, [props.history, props.isSignedIn]);

  useEffect(() => {
    if (props.userId) {
      getUserData();
      getUserStudents();
    }
  }, [props.userId]);

  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-lg-6 col-12">
          <div className="container-fluid">
            <div className="row">
              <div className="col mb-3">
                <TextField
                  required
                  fullWidth
                  id="your-name-input"
                  label="Your Name"
                  variant="outlined"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                />
              </div>
              <div className="col mb-3">
                <TextField
                  required
                  fullWidth
                  id="your-email-input"
                  label="Your Email"
                  variant="outlined"
                  value={yourEmail}
                  onChange={(e) => setYourEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <TextField
                  required
                  fullWidth
                  id="your-phone-input"
                  label="Your Phone Number"
                  variant="outlined"
                  value={yourNumber}
                  onChange={(e) => setYourNumber(e.target.value)}
                />
              </div>
              <div className="col mb-3">
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="select-student-label">Student</InputLabel>
                  <Select
                    required
                    labelId="select-student-label"
                    id="student-select"
                    value={student}
                    onChange={onStudentSelect}
                    label="Student"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {userStudents &&
                      userStudents.length > 0 &&
                      userStudents.map((student, index) => {
                        return (
                          <MenuItem key={student._id} value={index}>
                            {student.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <TextField
                  required
                  fullWidth
                  id="student-name-input"
                  label="Student Name"
                  variant="outlined"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>
              <div className="col mb-3">
                <TextField
                  required
                  fullWidth
                  id="parent-name-input"
                  label="Parent Name"
                  variant="outlined"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <TextField
                  required
                  fullWidth
                  id="parent-email-input"
                  label="Parent Email"
                  variant="outlined"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                />
              </div>
              <div className="col mb-3">
                <TextField
                  required
                  fullWidth
                  id="parent-phone-input"
                  label="Parent Phone"
                  variant="outlined"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <DateInput />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-12"></div>
      </div>
    </div>
  );
};

export default InvoicePage;
