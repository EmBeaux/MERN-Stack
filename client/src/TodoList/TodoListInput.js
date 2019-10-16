import React from "react";

const TodoListInput = props => {
  return (
    <input
      type={props.type}
      onChange={e => props.onChange(e)}
      placeholder={props.placeholder}
      style={{ width: props.width || "200px" }}
    />
  );
};

export default TodoListInput;
