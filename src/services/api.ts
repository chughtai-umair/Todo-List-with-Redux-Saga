import type { Todo } from "../types";

export const fetchTodosApi = async (): Promise<Todo[]> => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  return res.json();
};
