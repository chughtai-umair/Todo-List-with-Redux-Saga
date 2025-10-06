import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodosRequest } from "../actions/todoActions";
import type { RootState } from "../store";
import type { Todo } from "../types";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";

type FilterType = "all" | "active" | "completed";

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todos
  );
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  // Filter todos based on current filter
  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // 'all' filter
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading todos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <p className="font-medium">Error loading todos:</p>
        <p>{error}</p>
      </div>
    );
  }

  const completedCount = todos.filter((todo: Todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Your Todos</h3>
          <div className="text-sm text-gray-600">
            <span className="bg-white px-3 py-1 rounded-full">
              {completedCount} of {totalCount} completed
            </span>
          </div>
        </div>
        {totalCount > 0 && (
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Filter Component */}
      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />

      {/* Todo List */}
      {todos.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No todos yet
          </h3>
          <p className="text-gray-500">
            Add your first todo above to get started!
          </p>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-gray-400 text-4xl mb-2">🔍</div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No todos match this filter
          </h3>
          <p className="text-gray-500">
            Try changing your filter or add new todos!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTodos.map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
