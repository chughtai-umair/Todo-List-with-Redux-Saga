import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../actions/todoActions";
import type { Todo } from "../types";

const AddTodo: React.FC = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (title.trim()) {
      const newTodo: Todo = { id: Date.now(), title, completed: false };
      dispatch(addTodo(newTodo));
      setTitle("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add todo..."
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddTodo;
