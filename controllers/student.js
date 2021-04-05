const Student = require("../models/Student");

exports.createStudent = async (req, res) => {
  const {
    userGoogleId,
    name,
    parentName,
    parentEmail,
    parentPhone,
    school,
    lessonCost
  } = req.body;

  const student = new Student({
    userGoogleId,
    name,
    parentName,
    parentEmail,
    parentPhone,
    school,
    lessonCost
  });

  try {
    const savedStudent = await student.save();
    res.status(200).json({ success: true, data: savedStudent });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        data: "There was an error creating the student.",
      });
  }
};

exports.getStudents = async (req, res) => {
  const userGoogleId = req.query.userid;

  try {
    const foundStudents = await Student.find({ userGoogleId });
    res.status(200).json({ success: true, data: foundStudents });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        data: "There was an error finding your students",
      });
  }
};

exports.editStudent = async (req, res) => {
  const {
    studentId,
    name,
    parentName,
    parentEmail,
    parentPhone,
    school,
    lessonCost
  } = req.body;

  try {
    let student = await Student.findOneAndUpdate(
      { _id: studentId },
      {
        name,
        parentName,
        parentEmail,
        parentPhone,
        school,
        lessonCost
      }
    );

    res.status(201).json({
      success: true,
      data: student,
      message: "Student was successfully updated.",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        data: "There was an error finding your students",
      });
  }
};

exports.deleteStudent = async (req, res) => {
  const studentId = req.query.studentid;

  try {
    const deletedStudent = await Student.deleteOne({ _id: studentId });
    console.log(deletedStudent);

    res.status(201).json({
      success: true,
      data: deletedStudent,
      message: "Student was successfully deleted.",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        data: "There was an error deleting the student",
      });
  }
};
