// Local storage based API service (no external API calls)
import type { Todo } from "../types";
import {
  getTodosFromStorage,
  saveTodosToStorage,
  getNextTodoId,
} from "../storage/StoreData";

// Simulate async behavior like real API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Fetch todos from localStorage
  fetchTodos: async (): Promise<Todo[]> => {
    await delay(300); // Simulate network delay
    return getTodosFromStorage();
  },

  // Add new todo to localStorage
  addTodo: async (title: string): Promise<Todo> => {
    await delay(200);
    const todos = getTodosFromStorage();
    const newTodo: Todo = {
      id: getNextTodoId(todos),
      title: title.trim(),
      completed: false,
    };
    const updatedTodos = [...todos, newTodo];
    saveTodosToStorage(updatedTodos);
    return newTodo;
  },

  // Update todo title in localStorage
  updateTodoTitle: async (id: number, title: string): Promise<Todo> => {
    await delay(200);
    const todos = getTodosFromStorage();
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: title.trim() } : todo
    );
    saveTodosToStorage(updatedTodos);
    const updatedTodo = updatedTodos.find((todo) => todo.id === id);
    if (!updatedTodo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    return updatedTodo;
  },

  // Update todo (toggle completed status)
  updateTodo: async (id: number, completed: boolean): Promise<Todo> => {
    await delay(200);
    const todos = getTodosFromStorage();
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed } : todo
    );
    saveTodosToStorage(updatedTodos);
    const updatedTodo = updatedTodos.find((todo) => todo.id === id);
    if (!updatedTodo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    return updatedTodo;
  },

  // Delete todo from localStorage
  deleteTodo: async (id: number): Promise<void> => {
    await delay(200);
    const todos = getTodosFromStorage();
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    saveTodosToStorage(updatedTodos);
  },
};
