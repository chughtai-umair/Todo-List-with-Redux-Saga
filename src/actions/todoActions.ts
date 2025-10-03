import { ADD_TODO, TOGGLE_TODO, FETCH_TODOS, SET_TODOS } from "../types";
import type { Todo } from "../types";

export const addTodo = (todo: Todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const toggleTodo = (id: number) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const fetchTodos = () => ({
  type: FETCH_TODOS,
});

export const setTodos = (todos: Todo[]) => ({
  type: SET_TODOS,
  payload: todos,
});
