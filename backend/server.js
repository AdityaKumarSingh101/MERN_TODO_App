const express = require("express");
const auth = require("./jwtAuth/auth");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({ path: "../backend/.env" });

const userSignUp = require("./routes/signup");
const userLogin = require("./routes/login");
const connectToDB = require("./config/connectDB");
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);

  // Connect to DB
  connectToDB();
});

app.post("/SignUp", userSignUp);
app.post("/Login", userLogin);
app.get("/users/:userid/todos/", getAllTodos);
app.post("/users/:userid/todos/create", createTodo);
