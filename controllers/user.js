const User = require("../models/User");

exports.loginUser = async (req, res) => {
  console.log(req.body);

  const { name, email, googleId } = req.body;

  const foundUser = await User.find({ googleId });

  if (foundUser.length > 0) {
    console.log("found User ran");
    res.status(200).json({ data: "user exsists, logging in" });
  } else {
    console.log("create new User to save");
    const user = new User({
      name,
      email,
      googleId,
      phoneNumber: "",
    });

    try {
      const savedUser = await user.save();
      res.status(200).json({ success: true, data: savedUser });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, data: "There was an error logining you in" });
    }
  }
};

exports.getUser = async (req, res) => {
  const userId = req.query.userid;
  const foundUser = await User.find({ googleId: userId });

  if (foundUser.length > 0) {
    res.json({ success: true, data: foundUser });
  } else {
    res.json({
      success: false,
      data: "There was an error retriving your data.",
    });
  }
};

exports.updateUserInfo = async (req, res) => {
  const { googleId, name, email, phoneNumber } = req.body;

  console.log(googleId, name, email, phoneNumber);

  try {
    const user = await User.findOne({ googleId: googleId });

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).json({
      success: true,
      data: user,
      message: "Information successfully updated.",
    });
  } catch(error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Unable to update user"});
  }
};
