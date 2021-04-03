const path = require("path");
const router = require("express").Router();
const { loginUser, getUser, updateUserInfo } = require("../controllers/user");
const { createStudent, getStudents } = require("../controllers/student");

// If no API routes are hit, send the React app

router.route("/api/user").post(loginUser);
router.route("/api/user").get(getUser);
router.route("/api/user").put(updateUserInfo);

router.route("/api/students").post(createStudent);
router.route("/api/students").get(getStudents);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;