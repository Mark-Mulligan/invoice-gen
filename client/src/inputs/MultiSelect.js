import React from "react";
import { FormControl, InputLabel, Select, Input, Chip, MenuItem } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const monthsList = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Sepetember",
  "October",
  "November",
  "December",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles(() => ({
  formControl: {
    height: "40px"
  },
  label: {
    marginTop: "2px !important"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    marginRight: 2,
  },
}));

const MultiSelect = ({ selectValue, handleMultiSelect }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} variant="outlined" fullWidth>
      <InputLabel id="months-label">Invoice Month(s)</InputLabel>
      <Select
        className={classes.label}
        required
        labelId="months-label"
        id="months-select"
        multiple
        value={selectValue}
        onChange={handleMultiSelect}
        input={<Input id="month-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {monthsList.map((month) => (
          <MenuItem key={month} value={month}>
            {month}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;