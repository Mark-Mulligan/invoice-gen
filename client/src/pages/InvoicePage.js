import React, { useEffect, useState } from "react";
import DateInput from "../inputs/DataInput";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const InvoicePage = (props) => {
  const [userStudents, setUserStudents] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const [student, setStudent] = useState("");
  const [yourName, setYourName] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [yourNumber, setYourNumber] = useState("");
  const [months, setMonths] = useState([]);

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
        setUserInfo(response.data.data[0]);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
              <div className="col">
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="select-student-label">Student</InputLabel>
                  <Select
                    required
                    labelId="select-student-label"
                    id="student-select"
                    value={student}
                    onChange={(e) => setStudent(e.target.value)}
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
              <div className="col">

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
