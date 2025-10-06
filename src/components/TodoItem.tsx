import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  toggleTodoRequest,
  deleteTodoRequest,
  updateTodoRequest,
} from "../actions/todoActions";
import type { Todo } from "../types";

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      dispatch(updateTodoRequest(todo.id, editTitle.trim()));
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodoRequest(todo.id, !todo.completed))}
        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      />

      {/* Todo title or edit input */}
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 text-lg ${
            todo.completed ? "line-through text-gray-500" : "text-gray-800"
          } cursor-pointer`}
          onClick={() => dispatch(toggleTodoRequest(todo.id, !todo.completed))}
        >
          {todo.title}
        </span>
      )}

      {/* Status badge */}
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          todo.completed
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {todo.completed ? "Completed" : "Pending"}
      </span>

      {/* Action buttons */}
      {isEditing ? (
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => dispatch(deleteTodoRequest(todo.id))}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
