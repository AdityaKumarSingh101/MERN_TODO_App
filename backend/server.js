const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({ path: "../backend/.env" });

const auth = require("./jwtAuth/auth");
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

// Routing

//SignUp
app.post("/SignUp", auth, userSignUp);

// Login
app.post("/Login", auth, userLogin);

// All User Todos
app.get("/users/:userid/todos/", auth, getAllTodos);

// Add Todo
app.post("/users/:userid/todos/create", auth, createTodo);

// Update Todo
app.put("/users/:userid/todos/update/:todoid", updateTodo);

// Delete Todo
app.delete("/users/:userid/todos/delete/:todoid", deleteTodo);
