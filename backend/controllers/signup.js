const bcrypt = require("bcrypt");
const userModel = require("../models/UserModel");

const userSignUp = async (req, res) => {
  let { firstname, lastname, username, email, password, confirmPassword } =
    req.body;

  const hashedPassword =
    password === confirmPassword
      ? (await bcrypt.hash(password, 10)).toString()
      : res.json("Passwords dont match!");

  await userModel.create({
    name: {
      first: firstname,
      last: lastname,
    },
    username: username,
    email: email,
    password: hashedPassword,
  });
  res.json("User Registration Successful!");
};

module.exports = userSignUp;
