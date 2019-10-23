const express = require("express");

const TodoController = require("../controllers/todo-item-controller");

const router = express.Router();

router.post("/todoItem", TodoController.createTodoItem);
router.delete("/todoItem/:id", TodoController.deleteTodoItem);
router.put("/todoItem/:id", TodoController.updateTodoItem);
router.get("/todoList", TodoController.getTodoList);

module.exports = router;
