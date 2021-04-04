import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

class MultiSelect2 extends React.Component {
  state = {
    labelWidth: 0,
    monthsList: [
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
    ],
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  render() {
    return (
      <div className="App">
        <div className={"input"}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel
              ref={(ref) => {
                this.InputLabelRef = ref;
              }}
              htmlFor="months-select"
            >
              Invoice Month(s)
            </InputLabel>
            <Select
              multiple
              value={this.props.value}
              onChange={this.props.handleMultiSelect}
              input={
                <OutlinedInput
                  size="small"
                  labelWidth={this.state.labelWidth}
                  name="months-select"
                  id="months-select"
                />
              }
            >
              {this.state.monthsList.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }
}

export default MultiSelect2;
