const User = require("../models/UserModel");

const fetchUserData = async (req, res) => {
  const userid = req.params.userid;

  const user = await User.findById(userid);

  const userData = {
    id: user._id,
    name: {
      first: user.name.first,
      last: user.name.last,
    },
    username: user.username,
    email: user.email,
  };

  res.json(userData);
};

module.exports = { fetchUserData };
