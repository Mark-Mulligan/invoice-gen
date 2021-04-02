const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: {
    type: String,
    required: [true, "Please provied a name"],
  },
  parentName: String,
  parentEmail: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  parentPhone: String,
  school: String,
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
