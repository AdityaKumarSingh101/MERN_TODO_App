const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  todos: [
    {
      task: {
        type: String,
        required: true,
      },
      createdOn: {
        type: Date,
        default: Date.now,
      },
      completed: {
        type: Boolean,
        default: false,
      },
      tags: [
        {
          tag: {
            type: String,
          },
        },
      ],
    },
  ],
});

const UserModel = new mongoose.model("User", UserSchema, "Users");

module.exports = UserModel;
