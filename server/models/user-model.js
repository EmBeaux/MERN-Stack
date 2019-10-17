const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoItem = new Schema(
  {
    message: { type: [String], required: true },
    dueDate: { type: [String], required: true }
  },
  { timestamps: true }
);

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  todoList: {
    type: [TodoItem],
    default: []
  }
});

module.exports = mongoose.model("users", User);
