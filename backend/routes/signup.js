const bcrypt = require("bcrypt");
const userModel = require("../models/UserModel");

const userSignUp = async (req, res) => {
  try {
    let { firstname, lastname, username, email, password, confirmPassword } =
      req.body;

    const hashedPassword =
      password === confirmPassword
        ? (await bcrypt.hash(password, 10)).toString()
        : res.json({ msg: "Passwords dont match!" });

    await userModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      name: {
        first: firstname,
        last: lastname,
      },
    });
    res.status(200).json({ msg: "User Registration Successful!" });
  } catch (err) {
    res.status(500).json({ msg: "Registration Failed!" });
    console.error(err.message);
  }
};

module.exports = userSignUp;
