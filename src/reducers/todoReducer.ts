import {
  TODO_ACTIONS,
  ADD_TODO,
  TOGGLE_TODO,
  SET_TODOS,
} from "../actions/todoActions";
import type { TodoState } from "../types";
import type { Todo } from "../types";

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

const todoReducer = (state = initialState, action: any): TodoState => {
  switch (
    action.type // Saga actions
  ) {
    case TODO_ACTIONS.FETCH_TODOS_REQUEST:
    case TODO_ACTIONS.ADD_TODO_REQUEST:
    case TODO_ACTIONS.UPDATE_TODO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case TODO_ACTIONS.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload,
      };
    case TODO_ACTIONS.ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: [action.payload, ...state.todos],
      };

    case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: state.todos.map((todo: any) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo
        ),
      };

    case TODO_ACTIONS.TOGGLE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo: Todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case TODO_ACTIONS.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter(
          (todo: Todo) => todo.id !== action.payload.id
        ),
      };
    case TODO_ACTIONS.FETCH_TODOS_FAILURE:
    case TODO_ACTIONS.ADD_TODO_FAILURE:
    case TODO_ACTIONS.UPDATE_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Legacy actions for compatibility
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo: Todo) =>
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
