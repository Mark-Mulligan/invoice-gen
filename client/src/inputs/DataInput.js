import React from "react";
import {
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  dateInput: {
    marginTop: 0
  }
}));

const DateInput = (props) => {
  const classes = useStyles();

  const handleDateChange = (date) => {
    props.onDateChange(date.toLocaleDateString(), props.id);
  };

  return (
      <KeyboardDatePicker
        inputVariant="outlined"
        size="small"
        className={classes.dateInput}
        fullWidth
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id={props.id}
        label="Lesson Date"
        value={props.value}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
  );
};

export default DateInput;