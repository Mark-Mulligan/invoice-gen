import React, { useEffect, useState } from "react";
import axios from "axios";
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
];

const DashboardPage = (props) => {
  const [userInfo, setUserInfo] = useState(null);

  const getUserData = () => {
    axios
      .get(`/api/user?userid=${props.userId}`)
      .then((response) => {
        setUserInfo(response.data.data[0]);
        console.log(props);
        console.log(response);
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
    }
  }, [props.userId]);

  return (
    <div className="container">
      {userInfo && (
        <div className="profile-container mt-4">
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
                    <div className="col-md-4 col-12 d-flex align-items-center mb-3">
                      <div>
                        <h5>Email</h5>
                        <div>{userInfo.email}</div>
                      </div>
                    </div>
                    <div className="col-md-4 col-12 d-flex align-items-center mb-3">
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
                  <button className="btn btn-outline-dark">
                    Edit Information
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
