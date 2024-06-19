const UserModel = require("../models/UserModel");
const User = require("../models/UserModel");

const getAllTodos = async (req, res) => {
  const userId = req.params.userid;

  const user = await User.findById(userId);

  let todos = user.todos;

  res.json({ todos });
};

const createTodo = async (req, res) => {
  const userid = req.params.userid;

  const task = req.body.task,
    createdOn = Date.now,
    completed = req.body.completed || false,
    tags = req.body.tags;

  const todo = {
    task: task,
    createdOn: createdOn,
    completed: completed,
    tags: tags,
  };

  await User.findByIdAndUpdate(userid, { $push: { todos: { todo } } });
};

const updateTodo = async (req, res) => {};

const deleteTodo = async (req, res) => {};

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };
