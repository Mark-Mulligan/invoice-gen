const path = require("path");
const router = require("express").Router();
const { createUser } = require("../controllers/user");

// If no API routes are hit, send the React app

router.route("/api/user").post(createUser);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;