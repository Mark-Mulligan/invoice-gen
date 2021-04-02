const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: {
    type: String,
    required: [true, "Please provied a name"],
  },
  email: String,
  phoneNumber: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;