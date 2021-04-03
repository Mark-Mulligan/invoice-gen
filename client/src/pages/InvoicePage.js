import React, { useEffect } from "react";
import DateInput from "../inputs/DataInput";

const InvoicePage = (props) => {
  useEffect(() => {
    if (props.isSignedIn === false) {
      props.history.push("/");
    } 
  }, [props.history, props.isSignedIn]);

  return (
    <DateInput />
  )
};

export default InvoicePage;
