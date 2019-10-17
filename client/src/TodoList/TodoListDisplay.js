import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoListDisplay = props => {
  return (
    <Fragment>
      {props.todoList.length === 0 ? (
        <h3> You have no tasks to complete </h3>
      ) : (
        <ul>
          {props.todoList.map(todoItem => {
            return (
              <li>
                {todoItem.message} -- {todoItem.dueDate}{" "}
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => props.deleteTodoItem(todoItem)}
                  style={{ cursor: "pointer", marginLeft: "4px" }}
                />
              </li>
            );
          })}
        </ul>
      )}
    </Fragment>
  );
};

export default TodoListDisplay;
