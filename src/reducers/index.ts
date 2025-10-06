import { combineReducers } from "redux";
import todoReducer from "./todoReducer";

const rootReducer = combineReducers({
  todos: todoReducer, // Changed from 'todo' to 'todos' to match component usage
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
