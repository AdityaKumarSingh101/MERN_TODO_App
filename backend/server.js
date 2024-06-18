const express = require("express");
const auth = require("./jwtAuth/auth");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config({ path: "../backend/.env" });

const userSignUp = require("./routes/signup");
const userLogin = require("./routes/login");
const connectToDB = require("./config/connectDB");

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);

  // Connect to DB
  connectToDB();
});

app.post("/SignUp", auth, userSignUp);
app.post("/Login", auth, userLogin);
