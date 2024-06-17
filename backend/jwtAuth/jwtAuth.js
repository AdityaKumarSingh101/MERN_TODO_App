const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: "../backend/.env",
});
const secret = process.env.secret;

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.json({ msg: "No token exists!" });
  }

  try {
    await jwt.verify(token, secret),
      (error, decoded) => {
        if (error) {
          res.json({ msg: "Error! Token invalid!" });
        } else {
          req.user = decoded.user;
          next();
        }
      };
  } catch (err) {
    console.error(err.message);
    res.json({ msg: "Server Error!" });
  }
};

module.exports = auth;
