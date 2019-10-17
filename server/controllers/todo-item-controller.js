const TodoItem = require("../models/todo-item-model");

createTodoItem = (req, res) => {
  const body = req.body;

  if (!body || !body.message || !body.dueDate) {
    return res.status(400).json({
      success: false,
      error: "You must provide a message"
    });
  }

  const todoItem = new TodoItem(body);

  if (!todoItem) {
    return res.status(400).json({ success: false, error: err });
  }

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
  await TodoItem.find({}, (err, todoItems) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!todoItems.length) {
      return res
        .status(404)
        .json({ success: false, error: `Todo List not found` });
    }
    return res.status(200).json({ success: true, data: todoItems });
  }).catch(err => console.log(err));
};

deleteTodoItem = async (req, res) => {
  console.log(TodoItem.find({_id: req.params.id}))
  await TodoItem.findOneAndDelete({ _id: req.params.id }, (err, todoItem) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!todoItem) {
      return res
        .status(404)
        .json({ success: false, error: `TodoItem not found` });
    }

    return res.status(200).json({ success: true, data: todoItem });
  }).catch(err => console.log(err));
};

module.exports = {
  createTodoItem,
  deleteTodoItem,
  getTodoList
};
