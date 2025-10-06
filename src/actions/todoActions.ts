import type { Todo } from "../types";

// ==============================
// Action Types - Redux Saga style
// ==============================
export const TODO_ACTIONS = {
  FETCH_TODOS_REQUEST: "FETCH_TODOS_REQUEST",
  FETCH_TODOS_SUCCESS: "FETCH_TODOS_SUCCESS",
  FETCH_TODOS_FAILURE: "FETCH_TODOS_FAILURE",

  ADD_TODO_REQUEST: "ADD_TODO_REQUEST",
  ADD_TODO_SUCCESS: "ADD_TODO_SUCCESS",
  ADD_TODO_FAILURE: "ADD_TODO_FAILURE",

  UPDATE_TODO_REQUEST: "UPDATE_TODO_REQUEST",
  UPDATE_TODO_SUCCESS: "UPDATE_TODO_SUCCESS",
  UPDATE_TODO_FAILURE: "UPDATE_TODO_FAILURE",

  TOGGLE_TODO_REQUEST: "TOGGLE_TODO_REQUEST",
  TOGGLE_TODO_SUCCESS: "TOGGLE_TODO_SUCCESS",

  DELETE_TODO_REQUEST: "DELETE_TODO_REQUEST",
  DELETE_TODO_SUCCESS: "DELETE_TODO_SUCCESS",
} as const;

// ==============================
// Saga Action Creators
// ==============================
export const fetchTodosRequest = () =>
  ({
    type: TODO_ACTIONS.FETCH_TODOS_REQUEST,
  } as const);

export const addTodoRequest = (title: string) =>
  ({
    type: TODO_ACTIONS.ADD_TODO_REQUEST,
    payload: { title },
  } as const);

export const updateTodoRequest = (id: number, title: string) =>
  ({
    type: TODO_ACTIONS.UPDATE_TODO_REQUEST,
    payload: { id, title },
  } as const);

export const toggleTodoRequest = (id: number, completed: boolean) =>
  ({
    type: TODO_ACTIONS.TOGGLE_TODO_REQUEST,
    payload: { id, completed },
  } as const);

export const deleteTodoRequest = (id: number) =>
  ({
    type: TODO_ACTIONS.DELETE_TODO_REQUEST,
    payload: { id },
  } as const);

// ==============================
// Legacy Redux Actions
// ==============================
export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const FETCH_TODOS = "FETCH_TODOS";
export const SET_TODOS = "SET_TODOS";

export const addTodo = (todo: Todo) =>
  ({
    type: ADD_TODO,
    payload: todo,
  } as const);

export const toggleTodo = (id: number) =>
  ({
    type: TOGGLE_TODO,
    payload: id,
  } as const);

export const fetchTodos = () =>
  ({
    type: FETCH_TODOS,
  } as const);

export const setTodos = (todos: Todo[]) =>
  ({
    type: SET_TODOS,
    payload: todos,
  } as const);

// ==============================
// Action Type Definitions
// ==============================
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

// Saga Success/Failure Types
export interface FetchTodosSuccessAction {
  type: typeof TODO_ACTIONS.FETCH_TODOS_SUCCESS;
  payload: Todo[];
}

export interface FetchTodosFailureAction {
  type: typeof TODO_ACTIONS.FETCH_TODOS_FAILURE;
  payload: string;
}

export interface AddTodoSuccessAction {
  type: typeof TODO_ACTIONS.ADD_TODO_SUCCESS;
  payload: Todo;
}

export interface AddTodoFailureAction {
  type: typeof TODO_ACTIONS.ADD_TODO_FAILURE;
  payload: string;
}

export interface ToggleTodoSuccessAction {
  type: typeof TODO_ACTIONS.TOGGLE_TODO_SUCCESS;
  payload: { id: number; completed: boolean };
}

export interface DeleteTodoSuccessAction {
  type: typeof TODO_ACTIONS.DELETE_TODO_SUCCESS;
  payload: { id: number };
}

// Combine all
export type TodoActionTypes =
  | AddTodoAction
  | ToggleTodoAction
  | FetchTodosAction
  | SetTodosAction
  | FetchTodosSuccessAction
  | FetchTodosFailureAction
  | AddTodoSuccessAction
  | AddTodoFailureAction
  | ToggleTodoSuccessAction
  | DeleteTodoSuccessAction;
