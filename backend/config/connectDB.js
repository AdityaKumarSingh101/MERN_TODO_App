const mongoose = require("mongoose");

require("dotenv").config({
  path: "../backend/.env",
});

const DB_URI = process.env.DATABASE_URI;
const connectToDB = () => {
  try {
    mongoose.connect(DB_URI);
    console.log("Connected To DB.");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectToDB;
