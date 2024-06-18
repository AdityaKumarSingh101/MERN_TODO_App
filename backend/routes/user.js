const User = require("../models/UserModel");

const getAllTodos = async (req, res) => {
  const userId = req.params.userid;

  const user = await User.findById(userId);

  let todos = user.todos;

  res.json({ todos });
};

const createTodo = async (req, res) => {};

const updateTodo = async (req, res) => {};

const deleteTodo = async (req, res) => {};
