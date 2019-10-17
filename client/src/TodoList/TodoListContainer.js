import React, { Component } from "react";
import TodoListInput from "./TodoListInput";
import TodoListDisplay from "./TodoListDisplay";
import axios from "axios";

class App extends Component {
  state = {
    todoList: []
  };

  componentDidMount() {
    this.getTodoList();
  }

  getTodoList = () => {
    fetch("http://localhost:3001/api/todoList")
      .then(data => data.json())
      .then(res => this.setState({ todoList: res.data }));
  };

  createTodoItem = (message, dueDate) => {
    axios
      .post("http://localhost:3001/api/todoItem", {
        message: message,
        dueDate: dueDate
      })
      .then(res => {
        this.setState({
          todoList: this.state.todoList.concat(res.data.todoItem),
          message: undefined,
          dueDate: undefined
        });
      });
  };

  deleteTodoItem = (todoItem) => {
    axios
      .delete(`http://localhost:3001/api/todoItem/${todoItem._id}`, {
        todoItem: todoItem
      })
      .then(res => {
        this.setState({
          todoList: this.state.todoList.filter(item => item._id !== todoItem._id)
        });
      });
  };

  render() {
    const { todoList } = this.state;

    return (
      <div>
        <div style={{ marginLeft: "4px" }}>
          <h1>Task List</h1>
          <TodoListDisplay todoList={todoList} deleteTodoItem={this.deleteTodoItem} />
        </div>
        <form
          style={{ padding: "10px" }}
          onSubmit={e => {
            e.preventDefault();
            this.createTodoItem(this.state.message, this.state.dueDate);
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "325px"
            }}
          >
            <TodoListInput
              type="text"
              onChange={e => this.setState({ message: e.target.value })}
              placeholder="Add Message for Task"
            />
            <TodoListInput
              type="date"
              onChange={e => this.setState({ dueDate: e.target.value })}
              placeholder="Add Due Date for Task"
              width="100px"
            />
          </div>
          <button
            type="submit"
            style={{ marginTop: "4px" }}
            disabled={!(this.state.dueDate && this.state.message)}
          >
            ADD
          </button>
        </form>
      </div>
    );
  }
}

export default App;
