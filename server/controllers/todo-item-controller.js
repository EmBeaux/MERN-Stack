const TodoItem = require("../models/todo-item-model");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

createTodoItem = (req, res) => {
  const body = req.body;
  console.log(req.body.token)
  const user = jwt.decode(req.body.token.split(" ")[1], keys.secretOrKey)
  console.log(user)

  body.user_id = user.id
  delete body.token

  console.log(body)

  if (!body || !body.message || !body.dueDate && !body.user_id) {
    return res.status(400).json({
      success: false,
      error: "You must provide a message and due date"
    });
  }

  const todoItem = new TodoItem(body);

  if (!todoItem) {
    return res.status(400).json({ success: false, error: err });
  }

  console.log(todoItem)

  todoItem
    .save()
    .then(() => {
      return res.status(201).send({
        success: true,
        todoItem: todoItem
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: "Todo Item not created!"
      });
    });
};

getTodoList = async (req, res) => {
  const user = jwt.decode(req.query.token.split(" ")[1], keys.secretOrKey)

  await TodoItem.find({user_id: user.id}, (err, todoItems) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: todoItems || [] });
  }).catch(err => console.log(err));
};

deleteTodoItem = async (req, res) => {
  await TodoItem.findOneAndDelete({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true });
  }).catch(err => console.log(err));
};

module.exports = {
  createTodoItem,
  deleteTodoItem,
  getTodoList
};
