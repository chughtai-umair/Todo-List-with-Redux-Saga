export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Action Types
export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const FETCH_TODOS = "FETCH_TODOS";
export const SET_TODOS = "SET_TODOS";

// Action Interfaces
export interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: Todo;
}

export interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  payload: number;
}

export interface FetchTodosAction {
  type: typeof FETCH_TODOS;
}

export interface SetTodosAction {
  type: typeof SET_TODOS;
  payload: Todo[];
}

export type TodoActionTypes =
  | AddTodoAction
  | ToggleTodoAction
  | FetchTodosAction
  | SetTodosAction;
