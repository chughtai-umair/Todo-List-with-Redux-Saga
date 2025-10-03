import React from "react";
import { useDispatch } from "react-redux";
import { toggleTodo } from "../actions/todoActions";
import type { Todo } from "../types";

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <li
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
        cursor: "pointer",
      }}
      onClick={() => dispatch(toggleTodo(todo.id))}
    >
      {todo.title}
    </li>
  );
};

export default TodoItem;
