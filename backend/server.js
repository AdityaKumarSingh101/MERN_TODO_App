const express = require("express");
const app = express();
require("dotenv").config({ path: "../backend/.env" });

const userSignUp = require("./routes/signup");
const userLogin = require("./routes/login");
const connectToDB = require("./config/connectDB");

app.use(express.json());

const PORT = process.env.PORT;

// Connect to DB
connectToDB();

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.post("/SignUp", userSignUp);
app.post("/Login", userLogin);
