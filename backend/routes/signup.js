const bcrypt = require("bcrypt");
const userModel = require("../models/UserModel");

const userSignUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);
    await userModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.status(200).json({ msg: "User Registration Successful!" });
  } catch (err) {
    res.status(500).json({ msg: "Registration Failed!" });
    console.error(err.message);
  }
};

module.exports = userSignUp;
