import React, { Component } from "react";
import TodoListInput from "./TodoListInput";
import TodoListDisplay from "./TodoListDisplay";
import axios from "axios";

class App extends Component {
  state = {
    todoList: [],
    editing: false
  };

  componentDidMount() {
    this.getTodoList();
  }

  getTodoList = () => {
    fetch(`http://localhost:3001/api/todoList?token=${localStorage.token}`)
      .then(data => data.json())
      .then(res => this.setState({ todoList: res.data }));
  };

  createTodoItem = (message, dueDate) => {
    axios
      .post("http://localhost:3001/api/todoItem", {
        message: message,
        dueDate: dueDate,
        token: localStorage.token
      })
      .then(res => {
        this.setState({
          todoList: this.state.todoList.concat(res.data.todoItem),
          message: "",
          dueDate: ""
        });
      });
  };

  updateTodoItem = (message, dueDate, id) => {
    axios
      .put(`http://localhost:3001/api/todoItem/${id}`, {
        message: message,
        dueDate: dueDate,
        editing: false
      })
      .then(res => {
        const updatedTodoList = this.state.todoList.filter(todoItem => todoItem._id !== id)
        this.setState({
          todoList: updatedTodoList.concat(res.data.todoItem),
          message: "",
          dueDate: "",
          editingId: null
        });
      });
  };

  onUpdateTodoItem = todoItem => {
    this.setState({
      editingId: todoItem._id,
      message: todoItem.message,
      dueDate: todoItem.dueDate,
      editing: true
    })
  };

  deleteTodoItem = todoItem => {
    axios
      .delete(`http://localhost:3001/api/todoItem/${todoItem._id}`, {
        todoItem: todoItem
      })
      .then(res => {
        this.setState({
          todoList: this.state.todoList.filter(
            item => item._id !== todoItem._id
          )
        });
      });
  };

  render() {
    const { todoList } = this.state;

    return (
      <div>
        <div style={{ marginLeft: "4px" }}>
          <TodoListDisplay
            todoList={todoList}
            deleteTodoItem={this.deleteTodoItem}
            onUpdateTodoItem={this.onUpdateTodoItem}
          />
        </div>
        <form
          style={{ padding: "10px" }}
          onSubmit={e => {
            e.preventDefault();
            this.state.editing
              ? this.updateTodoItem(this.state.message, this.state.dueDate, this.state.editingId)
              : this.createTodoItem(this.state.message, this.state.dueDate)

          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "400px",
              margin: "0 auto"
            }}
          >
            <TodoListInput
              type="text"
              onChange={e => this.setState({ message: e.target.value })}
              value={this.state.message}
              placeholder="Add Message for Task"
            />
            <TodoListInput
              type="date"
              value={this.state.dueDate}
              onChange={e => this.setState({ dueDate: e.target.value })}
              placeholder="Add Due Date for Task"
              width="115px"
            />
            <button
              type="submit"
              style={{ marginTop: "4px" }}
              disabled={!(this.state.dueDate && this.state.message)}
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
