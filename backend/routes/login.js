const bcrypt = require("bcrypt");
const userModel = require("../models/UserModel");

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  // Check if password is entered
  if (!password) {
    res.json({ msg: "Please enter password!" });
  }

  // Check if user exists
  const existingUser = await userModel.findOne({ username: username });

  if (!existingUser) {
    res.json({ msg: "User not found!" });
  }

  let passMatch = await bcrypt.compare(password, existingUser.password);

  // Check if password matches
  if (passMatch) {
    res.json({ msg: "User Login Success!" });
  } else {
    res.json({ msg: "Authentication Failed!" });
  }
};

module.exports = userLogin;
