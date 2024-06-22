const bcrypt = require("bcrypt");
const userModel = require("../models/UserModel");

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  // Check if password is entered
  if (!password || password === "") {
    res.json({ msg: "Please enter password!" });
  }

  // Check if user exists
  const existingUser = userModel.findOne({ username: username });

  if (!existingUser) {
    res.json({ msg: "User not found!" });
  }

  let passMatch = bcrypt.compare(password, existingUser.password);

  // Check if password matches
  if (passMatch) {
    let todos = existingUser.todos;
    res.json({ todos });
  } else {
    res.json({ msg: "Username / Password Incorrect!" });
  }
};

module.exports = userLogin;
