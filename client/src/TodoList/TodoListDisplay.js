import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoListDisplay = props => {
  return (
    <div
      style={{
        maxWidth: "400px",
        padding: "80px 80px",
        margin: "10px auto",
        background: "#ebf1f6"
      }}
    >
      {!!props.todoList && props.todoList.length === 0 ? (
        <h3> Use the form below to add items to your List! </h3>
      ) : (
        <ul>
          {props.todoList.map(todoItem => {
            return (
              <li key={todoItem._id}>
                {todoItem.message} -- {todoItem.dueDate}{" "}
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => props.deleteTodoItem(todoItem)}
                  style={{ cursor: "pointer", marginLeft: "4px" }}
                />
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => props.onUpdateTodoItem(todoItem)}
                  style={{ cursor: "pointer", marginLeft: "4px" }}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TodoListDisplay;
