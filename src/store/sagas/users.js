import { put, takeEvery } from 'redux-saga/effects';
import { Types as usersActionTypes } from 'store/ducks/users';

function* getUsers(id) {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users/')
    const data = yield res.json()
    yield put({ type: usersActionTypes.USERS_RECEIVED, payload: data });
  } catch (err) {
    yield put({ type: usersActionTypes.GET_USERS_ERROR, payload: res });
  }
}

export function* actionGetUsers() {
  yield takeEvery(usersActionTypes.GET_USERS, getUsers);
}
