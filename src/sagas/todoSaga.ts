import { call, put, takeEvery } from "redux-saga/effects";
import { TODO_ACTIONS, FETCH_TODOS, setTodos } from "../actions/todoActions";
import { api } from "../services/api";
import type { Todo } from "../types";

// Fetch todos saga
function* fetchTodosSaga(): Generator<any, void, any> {
  try {
    const response = yield call(api.fetchTodos);
    // Handle both axios and fetch formats
    const todos = response?.data ?? response;
    yield put({
      type: TODO_ACTIONS.FETCH_TODOS_SUCCESS,
      payload: todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    yield put({
      type: TODO_ACTIONS.FETCH_TODOS_FAILURE,
      payload: "Failed to fetch todos",
    });
  }
}

// Add todo saga
function* addTodoSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(api.addTodo, action.payload.title);
    const newTodo = response?.data ?? response;
    yield put({
      type: TODO_ACTIONS.ADD_TODO_SUCCESS,
      payload: newTodo,
    });
  } catch (error) {
    console.error("Error adding todo:", error);
    yield put({
      type: TODO_ACTIONS.ADD_TODO_FAILURE,
      payload: "Failed to add todo",
    });
  }
}

// Update todo saga
function* updateTodoSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(
      api.updateTodoTitle,
      action.payload.id,
      action.payload.title
    );
    const updatedTodo = response?.data ?? response;
    yield put({
      type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
      payload: {
        ...updatedTodo,
        id: action.payload.id,
        title: action.payload.title,
      },
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    // Still update locally if API fails
    yield put({
      type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
      payload: { id: action.payload.id, title: action.payload.title },
    });
  }
}

// Toggle todo saga
function* toggleTodoSaga(action: any): Generator<any, void, any> {
  try {
    yield call(api.updateTodo, action.payload.id, !action.payload.completed);
    yield put({
      type: TODO_ACTIONS.TOGGLE_TODO_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    console.error("Toggle failed:", error);
    // still toggle locally
    yield put({
      type: TODO_ACTIONS.TOGGLE_TODO_SUCCESS,
      payload: action.payload,
    });
  }
}

// Delete todo saga
function* deleteTodoSaga(action: any): Generator<any, void, any> {
  try {
    yield call(api.deleteTodo, action.payload.id);
    yield put({
      type: TODO_ACTIONS.DELETE_TODO_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    console.error("Delete failed:", error);
    // still delete locally
    yield put({
      type: TODO_ACTIONS.DELETE_TODO_SUCCESS,
      payload: action.payload,
    });
  }
}

// Legacy fetch todos saga
// function* legacyFetchTodosSaga() {
//   try {
//     const response: any = yield call(api.fetchTodos);
//     const todos: Todo[] = response?.data ?? response;
//     yield put(setTodos(todos));
//   } catch (error) {
//     console.error("Error fetching todos:", error);
//   }
// }

function* legacyFetchTodosSaga(): Generator<any, void, any> {
  try {
    const response: { data?: Todo[] } = yield call(api.fetchTodos);
    const todos: Todo[] = response?.data ?? (response as unknown as Todo[]);
    yield put(setTodos(todos));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

export default function* todoSaga() {
  yield takeEvery(TODO_ACTIONS.FETCH_TODOS_REQUEST, fetchTodosSaga);
  yield takeEvery(TODO_ACTIONS.ADD_TODO_REQUEST, addTodoSaga);
  yield takeEvery(TODO_ACTIONS.UPDATE_TODO_REQUEST, updateTodoSaga);
  yield takeEvery(TODO_ACTIONS.TOGGLE_TODO_REQUEST, toggleTodoSaga);
  yield takeEvery(TODO_ACTIONS.DELETE_TODO_REQUEST, deleteTodoSaga);
  yield takeEvery(FETCH_TODOS, legacyFetchTodosSaga);
}
