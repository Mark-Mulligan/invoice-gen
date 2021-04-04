import React, { useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";

import MyDocument from "../pdf/MyDocument";
import DateInput from "../inputs/DataInput";
import MultiSelect from "../inputs/MultiSelect";
import "./InvoicePage.css";

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
  const [lessonNum, setLessonNum] = useState(4);
  const [lessons, setLessons] = useState([]);
  const [total, setTotal] = useState(84);

  const [pdfData, setPdfData] = useState(null);

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
      lessonState.push({ date: new Date().toLocaleDateString(), cost: 21 });
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
    if (lessonNum && lessonNum > 0) {
      console.log("this ran");
      createLessonState(lessonNum);
    }
  }, [lessonNum]);

  useEffect(() => {
    let sum = 0;
    lessons.forEach((lesson) => {
      sum += lesson.cost;
    });
    setTotal(sum);
  }, [lessons]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    setPdfData({
      ...pdfData,
      lessons,
      total,
      lessonNum,
      studentName,
      yourName,
      yourEmail,
      yourNumber,
      parentName,
      parentEmail,
      months,
    });
  };

  return (
    <div className="pt-4 light-grey-background invoice-page">
      <div className="row">
        <div className="col-lg-6 col-12">
          <form onSubmit={onFormSubmit}>
            <div className="container-fluid">
              <div className="row">
                <div className="col mb-3">
                  <TextField
                    fullWidth
                    id="your-name-input"
                    label="Your Name"
                    variant="outlined"
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    size="small"
                  />
                </div>
                <div className="col mb-3">
                  <TextField
                    fullWidth
                    size="small"
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
                    fullWidth
                    size="small"
                    id="your-phone-input"
                    label="Your Phone Number"
                    variant="outlined"
                    value={yourNumber}
                    onChange={(e) => setYourNumber(e.target.value)}
                  />
                </div>
                <div className="col mb-3">
                  <FormControl size="small" fullWidth variant="outlined">
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
                    fullWidth
                    size="small" 
                    id="student-name-input"
                    label="Student Name"
                    variant="outlined"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>
                <div className="col mb-3">
                  <TextField
                    fullWidth
                    size="small" 
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
                    fullWidth
                    size="small" 
                    id="parent-email-input"
                    label="Parent Email"
                    variant="outlined"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                  />
                </div>
                <div className="col mb-3">
                  <TextField
                    fullWidth
                    size="small" 
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
                    value={months}
                    handleMultiSelect={handleMultiSelect}
                  />
                </div>
                <div className="col mb-3">
                  <TextField
                    required
                    fullWidth
                    size="small" 
                    type="number"
                    id="lesson-number-input"
                    label="Number of Lessons"
                    variant="outlined"
                    value={lessonNum}
                    onChange={(e) => setLessonNum(e.target.value)}
                  />
                </div>
              </div>

              {lessons.length > 0 &&
                lessons.map((lesson, index) => {
                  return (
                    <div className="row" key={`lesson-group-${index}`}>
                      <div className="col mb-3">
                        <DateInput
                          id={`date-input-${index}`}
                          onDateChange={onDateChange}
                          value={lessons[index].date}
                        />
                      </div>
                      <div className="col mb-3">
                        <TextField
                          fullWidth
                          size="small"
                          id={`cost-input-${index}`}
                          label="Amount"
                          type="number"
                          value={lessons[index].cost}
                          variant="outlined"
                          onChange={(e) => {
                            onCostChange(e, e.target.id);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
                <button type="submit" className="btn btn-dark btn-block">Update Pdf</button>
            </div>
           
          </form>
        </div>
        <div className="col-lg-6 col-12">
        {pdfData !== null ? (
          <PDFViewer className="container-fluid pdf-viewer">
            <MyDocument data={pdfData} title="test" />
          </PDFViewer>
        ) : null}
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
