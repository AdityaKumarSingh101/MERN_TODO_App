const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
require("dotenv").config({
  path: "../backend/.env",
});

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

const auth = async (req, res, next) => {
  const user = User.findOne({ username: req.body.username });
  // If cookie is not set, generate an access and refresh token
  // Set the cookie
  if (req.cookies.jwt === undefined) {
    let payload = { username: user.username, email: user.email };

    const accessToken = jwt.sign(payload, accessSecret, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: "1d" });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    next();
  } else {
    // If cookie exists, verify the jwt and generate a new access token
    const token = req.cookies.jwt;

    jwt.verify(token, refreshSecret, (err, decoded) => {
      if (err) {
        console.error(err.message);
        res.json({ msg: "Invalid Token!" });
      } else {
        const payload = {
          username: user.username,
          email: user.email,
        };
        const accessToken = jwt.sign(payload, accessSecret, {
          expiresIn: "15m",
        });
        next();
        res.json({ accessToken });
      }
    });
  }
};

module.exports = auth;
