const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({ path: "../backend/.env" });

//const auth = require("./jwtAuth/auth");
const userSignUp = require("./controllers/signup");
const userLogin = require("./controllers/login");
const connectToDB = require("./config/connectDB");
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("./controllers/userTodos");

const app = express();
app.use(cors());
app.use(express.json());
//app.use(cookieParser());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);

  // Connect to DB
  connectToDB();
});

// Routing

//SignUp
app.post("/SignUp", userSignUp);

// Login
app.post("/Login", userLogin);

// All User Todos
app.get("/users/:userid/todos/", getAllTodos);

// Add Todo
app.post("/users/:userid/todos/create", createTodo);

// Update Todo
app.put("/users/:userid/todos/update/:todoid", updateTodo);

// Delete Todo
app.delete("/users/:userid/todos/delete/:todoid", deleteTodo);
