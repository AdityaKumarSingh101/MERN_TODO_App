const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/UserModel");

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!password) {
    res.json({ msg: "Please enter password!" });
  }

  const existingUser = await userModel.findOne({ username: username });

  if (!existingUser) {
    res.json({ msg: "User not found!" });
  }

  let passMatch = await bcrypt.compare(password, existingUser.password);

  if (passMatch) {
    res.json({ msg: "User Login Success!" });
  } else {
    res.json({ msg: "Authentication Failed!" });
  }
};

module.exports = userLogin;
