import React, { useEffect, useState } from "react";
import axios from "axios";
import EditProfileModal from "../modals/EditProfileModal";
import Table from "../components/Table";
import StudentModal from "../modals/StudentModal";
import "./DashboardPage.css";

const columns = [
  {
    Header: "Student Name",
    accessor: "name", // accessor is the "key" in the data
  },
  {
    Header: "Parent Name",
    accessor: "parentName",
  },
  {
    Header: "Parent Email",
    accessor: "parentEmail",
  },
  {
    Header: "Parent Phone",
    accessor: "parentPhone",
  },
  {
    Header: "School",
    accessor: "school",
  },
  {
    Header: "Rate",
    accessor: "lessonCost",
  },
];

const DashboardPage = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userStudents, setUserStudents] = useState([]);
  const [success, setSuccess] = useState("");

  const generateMessage = (message) => {
    setSuccess(message);
    setTimeout(() => {
      setSuccess("");
    }, 2000);
  };

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
        setUserInfo(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (props.isSignedIn === false) {
      console.log("user redirected to home");
      props.history.push("/");
    }
  }, [props]);

  useEffect(() => {
    if (props.userId) {
      getUserData();
      getUserStudents();
    }
  }, [props.userId]);

  return (
    <div className="container">
      <StudentModal
        addStudentModal
        submitButtonName="Add Student"
        showStudentModal={props.showStudentModal}
        hideModal={props.hideModal}
        userId={props.userId}
        afterSubmit={getUserStudents}
      />
      {userInfo && (
        <div className="profile-container mt-4 mb-4">
          <div className="centered-text">
            <h2 className="centered-text">My Account Info</h2>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-9 col-12">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-4 col-12 d-flex align-items-center mb-3">
                      <div>
                        <h5>Name</h5>
                        <div>{userInfo.name}</div>
                      </div>
                    </div>
                    <div className="col-md-5 col-12 d-flex align-items-center mb-3">
                      <div>
                        <h5>Email</h5>
                        <div>{userInfo.email}</div>
                      </div>
                    </div>
                    <div className="col-md-3 col-12 d-flex align-items-center mb-3">
                      <div>
                        <h5>Phone</h5>
                        <div>{userInfo.phoneNumber || `N/A`}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-12 d-flex align-items-center justify-content-center mb-3">
                <div>
                  <EditProfileModal
                    googleId={props.userId}
                    name={userInfo.name}
                    email={userInfo.email}
                    phone={userInfo.phoneNumber}
                    setUserInfo={setUserInfo}
                    getUserData={getUserData}
                  />
                </div>
              </div>
            </div>
          </div>

          {userStudents && userStudents.length > 0 ? (
            <div className="table-wrapper">
              <Table
                columns={columns}
                data={userStudents}
                generateMessage={generateMessage}
                afterSubmit={getUserStudents}
                userId={props.userId}
              />
            </div>
          ) : (
            <div className="container-fluid mt-4">
              <div className="row">
                <div className="col centered-text">
                  <h6>
                    You Currently have no students. Click add students at the
                    top to add students to your roster. Their information will be used to generate invoices.
                  </h6>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
