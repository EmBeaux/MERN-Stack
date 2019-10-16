import React, { Fragment } from "react";

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
                {todoItem.message} -- {todoItem.dueDate}
              </li>
            );
          })}
        </ul>
      )}
    </Fragment>
  );
};

export default TodoListDisplay;
