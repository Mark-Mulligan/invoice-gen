import React, { useEffect } from "react";

const InvoicePage = (props) => {
  useEffect(() => {
    if (props.isSignedIn === false) {
      props.history.push("/");
    } 
  }, [props.history, props.isSignedIn]);

  return <div>Invoice Page</div>;
};

export default InvoicePage;
