import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";

import DateInput from "../inputs/DataInput";
import MultiSelect from "../inputs/MultiSelect";

const InvoicePage = (props) => {
  const [userStudents, setUserStudents] = useState("");

  const [student, setStudent] = useState("");
  const [yourName, setYourName] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [yourNumber, setYourNumber] = useState("");

  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");

  const [months, setMonths] = useState([]);
  const [numLessons, setNumLessons] = useState(4);
  const [lessons, setLessons] = useState([]);

  const getUserStudents = () => {
    axios
      .get(`/api/students?userid=${props.userId}`)
      .then((response) => {
        setUserStudents(response.data.data);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMultiSelect = (event) => {
    setMonths(event.target.value);
  };

  const createLessonState = (numberOfLessons) => {
    const lessonState = [];
    for (let i = 0; i < numberOfLessons; i++) {
      lessonState.push({ date: new Date(), cost: 21 });
    }
    setLessons(lessonState);
  };

  const onCostChange = (event, inputId) => {
    let numRegex = /[0-9]+/;
    let result = inputId.match(numRegex);
    updateFieldChanged("cost", Number(result[0]), Number(event.target.value));
  };

  const onDateChange = (date, inputId) => {
    let numRegex = /[0-9]+/;
    let result = inputId.match(numRegex);
    updateFieldChanged("date", Number(result[0]), date);
  };

  const updateFieldChanged = (name, index, value) => {
    let newArr = lessons.map((item, i) => {
      if (index === i) {
        return { ...item, [name]: value };
      } else {
        return item;
      }
    });
    setLessons(newArr);
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

  useEffect(() => {
    if (numLessons && numLessons > 0) {
      console.log("this ran");
      createLessonState(numLessons);
    }
  }, [numLessons]);

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
              <div className="col mb-3">
                <MultiSelect
                  selectValue={months}
                  handleMultiSelect={handleMultiSelect}
                />
              </div>
              <div className="col mb-3">
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="lesson-number-input"
                  label="Number of Lessons"
                  variant="outlined"
                  value={numLessons}
                  onChange={(e) => setNumLessons(e.target.value)}
                />
              </div>
            </div>

            {lessons.length > 0 && (
              <div className="row">
                {console.log(lessons)}
                <div className="col mb-3">
                  <DateInput
                    id="date-input-0"
                    onDateChange={onDateChange}
                    value={lessons[0].date}
                  />
                </div>
                <div className="col mb-3">
                  <TextField
                    fullWidth
                    id="cost-input-0"
                    label="Amount"
                    type="number"
                    value={lessons[0].cost}
                    variant="outlined"
                    onChange={(e) => {
                      onCostChange(e, e.target.id);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-6 col-12"></div>
      </div>
    </div>
  );
};

export default InvoicePage;
