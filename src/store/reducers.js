import { combineReducers } from 'redux';

import { default as usersReducer } from 'store/ducks/users';

export default combineReducers({
  users: usersReducer
});