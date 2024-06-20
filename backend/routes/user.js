const User = require("../models/UserModel");

const getAllTodos = async (req, res) => {
  const userId = req.params.userid;

  const user = await User.findById(userId);
  const todos = user.todos;

  res.json({ todos });
};

const createTodo = async (req, res) => {
  const userid = req.params.userid;

  const task = req.body.task,
    tags = req.body.tags;
  await User.findByIdAndUpdate(userid, {
    $push: {
      todos: {
        task: task,
        tags: tags,
      },
    },
  });
};

const updateTodo = async (req, res) => {
  const userid = req.params.userid;
  const todoid = req.params.todoid;

  const task = req.body.task,
    tags = req.body.tags;
  let completed;
  if (req.body.completed === "true") {
    completed = true;
  } else {
    completed = false;
  }

  await User.updateOne(
    { _id: userid, "todos._id": todoid },
    {
      $set: {
        "todos.$.task": task,
        "todos.$.completed": completed,
        "todos.$.tags": tags,
      },
    }
  );
};

const deleteTodo = async (req, res) => {
  const userid = req.params.userid;
  const todoid = req.params.todoid;

  await User.findByIdAndUpdate(userid, { $pull: { todos: { _id: todoid } } });
};

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };
