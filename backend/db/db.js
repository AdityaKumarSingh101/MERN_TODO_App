const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

const connectDB = async () => {
  try {
    mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Connected To DB.");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
