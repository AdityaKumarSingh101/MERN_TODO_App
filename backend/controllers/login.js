const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

const userLogin = async (req, res) => {
  let { username, password } = req.body;

  // Check if password is entered
  if (!username || username === "" || !password || password === "") {
    return res.json("Please enter username / password!");
  }

  // Check if user exists
  let user = await User.findOne({ username: username });

  if (!user) {
    return res.json("User not found!");
  }

  let passMatch = await bcrypt.compare(password, user.password);

  const userData = {
    name: {
      first: user.name.first,
      last: user.name.last,
    },
    username: user.username,
    email: user.email,
    todos: user.todos,
  };
  // Check if password matches
  if (passMatch) {
    return res.json(userData);
  } else {
    return res.json("Username / Password Incorrect!");
  }
};

module.exports = userLogin;
