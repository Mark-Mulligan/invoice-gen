const Student = require("../models/Student");

exports.createStudent = async (req, res) => {
  const { userGoogleId, name, parentName, parentEmail, parentPhone, school } = req.body;

  const student = new Student({
    userGoogleId,
    name,
    parentName,
    parentEmail,
    parentPhone,
    school
  });

  try {
    const savedStudent = await student.save();
    res.status(200).json({ success: true, data: savedStudent });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, data: "There was an error creating the student." });
  }
}

exports.getStudents = async (req, res) => {
  const userGoogleId = req.query.userid;

  try {
    const foundStudents = await Student.find({ userGoogleId });
    res.status(200).json({ success: true, data: foundStudents });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, data: "There was an error finding your students" });
  }

  


}