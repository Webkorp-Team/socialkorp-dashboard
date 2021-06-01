import { all } from 'redux-saga/effects';

import { actionGetUsers } from 'store/sagas/users';

export default function* rootSaga() {
  yield all([
    actionGetUsers()
  ])
};