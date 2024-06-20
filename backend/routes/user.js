const User = require("../models/UserModel");

const getAllTodos = async (req, res) => {
  const userId = req.params.userid;

  const user = await User.findById(userId);
  const todos = user.todos;

  res.json({ todos });
};

const createTodo = async (req, res) => {
  const userid = req.params.userid;

  const todo = {
    task: req.body.task,
    createdOn: Date.now,
    completed: req.body.completed || false,
    tags: req.body.tags,
  };

  await User.findByIdAndUpdate(userid, {
    $push: { todos: { todo } },
  });
};

const updateTodo = async (req, res) => {
  const userid = req.params.userid;
  const todoid = req.params.todoid;

  const user = await User.findById(userid);

  const todo = await user.todos.findById(todoid);

  const updatedTodo = {
    task: req.body.task,
    createdOn: todo.createdOn,
    completed: req.body.completed,
    tags: req.body.tags,
  };
};

const deleteTodo = async (req, res) => {
  const userid = req.params.userid;
  const todoid = req.params.todoid;

  await User.findByIdAndUpdate(userid, { $pull: { todos: { _id: todoid } } });
};

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };
