
import React, { useState } from "react";
import {
  KeyboardDatePicker,
} from "@material-ui/pickers";

const DateInput = (props) => {
  const [date, setDate] = useState(new Date());

  return (
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-input-1"
        label="Lesson Date"
        value={date}
        onChange={setDate}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
  );
};

export default DateInput;