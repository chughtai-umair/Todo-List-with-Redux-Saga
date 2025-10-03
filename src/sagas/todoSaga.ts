import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_TODOS } from "../types";
import { setTodos } from "../actions/todoActions";
import { fetchTodosApi } from "../services/api";
import type { Todo } from "../types/index";

function* fetchTodosSaga() {
  try {
    const todos: Todo[] = yield call(fetchTodosApi);
    yield put(setTodos(todos));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

export default function* todoSaga() {
  yield takeEvery(FETCH_TODOS, fetchTodosSaga);
}
