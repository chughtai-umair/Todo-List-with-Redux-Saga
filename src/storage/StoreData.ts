import type { Todo } from "../types/index";
import { Data } from "../data/Data";

const STORAGE_KEY = "redux_saga_todos";

export const getTodosFromStorage = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      return JSON.parse(stored);
    }

    saveTodosToStorage(Data);
    return Data;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return Data;
  }
};

export const saveTodosToStorage = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const clearTodosFromStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

export const getNextTodoId = (todos: Todo[]): number => {
  if (todos.length === 0) return 1;
  return Math.max(...todos.map((todo) => todo.id)) + 1;
};
