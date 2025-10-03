import { ADD_TODO, TOGGLE_TODO, SET_TODOS } from "../types";

import type { Todo, TodoActionTypes } from "../types";

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoReducer = (
  state = initialState,
  action: TodoActionTypes
): TodoState => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case SET_TODOS:
      return { ...state, todos: action.payload };

    default:
      return state;
  }
};

export default todoReducer;
