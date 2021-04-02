import React, { useEffect, useState } from "react";

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
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    console.log(props);
    if (props.isSignedIn === false) {
      console.log("user redirected to home");
      props.history.push("/");
    } else {
      
    }
  }, [props]);

  return <div>Dashboard</div>;
};

export default DashboardPage;
