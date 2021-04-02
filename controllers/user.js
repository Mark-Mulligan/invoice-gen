const User = require("../models/User");

exports.createUser = async (req, res) => {
  console.log(req.body);

  const {
    name,
    email,
    googleId,
  } = req.body;

  const foundUser = await User.find({ googleId });

  if (foundUser.length > 0) {
    console.log('found User ran');
    res.status(200).json({ data: 'user exsists, logging in' });
  } else {
    console.log('create new User to save')
    const user = new User({
      name,
      email,
      googleId,
      phoneNumber: ''
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
}

