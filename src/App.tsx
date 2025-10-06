import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import "./index.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
              📝 Todo App
            </h1>
            <p className="text-center text-gray-600">
              Built with Redux Saga & TypeScript
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <AddTodo />
          <TodoList />
        </div>
      </div>
    </Provider>
  );
};

export default App;
