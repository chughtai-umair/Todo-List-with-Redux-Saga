import React from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  return (
    <div>
      <h1>Todo App with Redux-Saga + TS</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;
