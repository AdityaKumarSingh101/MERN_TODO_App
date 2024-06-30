const User = require("../models/UserModel");
const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const getAllTodos = async (req, res) => {
  const userId = req.params.userid;

  const user = await User.findById(userId);
  const todos = user.todos;

  res.json(todos);
};

const createTodo = async (req, res) => {
  const userid = req.params.userid;

  const task = req.body.task,
    createdOn = dayjs().format("dddd, DD MMM");
  tags = req.body.tags;
  await User.findByIdAndUpdate(userid, {
    $push: {
      todos: {
        task: task,
        createdOn: createdOn,
        tags: tags,
      },
    },
  });

  const user = await User.findById(userid);
  const todos = user.todos;

  res.json(todos);
};

const updateTodo = async (req, res) => {
  const userid = req.params.userid;
  const todoid = req.params.todoid;

  const task = req.body.task,
    tags = req.body.tags;
  let completed;
  if (req.body.completed === "Yes") {
    completed = true;
  }
  if (req.body.completed === "No") {
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

  const user = await User.findById(userid);
  const todos = user.todos;

  res.json(todos);
};

const deleteTodo = async (req, res) => {
  const userid = req.params.userid;
  const todoid = req.params.todoid;

  await User.findByIdAndUpdate(userid, { $pull: { todos: { _id: todoid } } });

  const user = await User.findById(userid);
  const todos = user.todos;

  res.json(todos);
};

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };
