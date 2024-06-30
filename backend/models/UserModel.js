const mongoose = require("mongoose");
const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const UserSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
    },
  },
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
        type: String,
        default: () => {
          return dayjs().format("ll");
        },
      },
      completed: {
        type: Boolean,
        default: false,
      },
      tags: [
        {
          type: String,
        },
      ],
    },
  ],
});

const UserModel = mongoose.model("User", UserSchema, "Users");

module.exports = UserModel;
