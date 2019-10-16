const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoItem = new Schema(
  {
    message: { type: [String], required: true },
    dueDate: { type: [String], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("todo-items", TodoItem);
