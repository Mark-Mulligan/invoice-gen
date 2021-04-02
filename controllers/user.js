const User = require("../models/User");

exports.createUser = async (req, res) => {
  console.log(req.body);
  res.json({ success: true, data: "User Route hit"});
}

