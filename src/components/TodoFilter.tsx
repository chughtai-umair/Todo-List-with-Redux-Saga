import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

import type { Todo } from "../types";

type FilterType = "all" | "active" | "completed";

// interface Todo {
//   id: number;
//   text: string;
//   completed: boolean;
// }

interface FilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const TodoFilter: React.FC<FilterProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  const todos = useSelector((state: RootState) => state.todos.todos);

  const filterCounts = {
    all: todos.length,
    active: todos.filter((todo: Todo) => !todo.completed).length,
    completed: todos.filter((todo: Todo) => todo.completed).length,
  };

  const filters: { key: FilterType; label: string; color: string }[] = [
    {
      key: "all",
      label: "All",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      key: "active",
      label: "Active",
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      key: "completed",
      label: "Completed",
      color: "bg-green-500 hover:bg-green-600",
    },
  ];

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 mb-2">
      <div className="flex flex-wrap gap-2 justify-center">
        {filters.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-4 py-2 rounded-lg text-white  transition-colors ${
              currentFilter === key ? color : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {label} ({filterCounts[key]})
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilter;
