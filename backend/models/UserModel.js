const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
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

const UserModel = mongoose.model("User", UserSchema, "Users");

module.exports = UserModel;
