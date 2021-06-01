import { HYDRATE } from 'next-redux-wrapper';


/**
 * Action Types
 */

export const Types = {
  GET_USERS: 'users/GET_USERS',
  USERS_RECEIVED: 'users/USERS_RECEIVED',
  GET_USERS_ERROR: 'users/GET_USERS_ERROR',
};



/**
 * Reducer
 */

const initialState = {
  usersList: [],
  fetchUsersError: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.users }
    case Types.USERS_RECEIVED:
        return { ...state, usersList: action.payload }
    case Types.GET_USERS_ERROR:
      return { ...state, fetchUsersError: true }
    default: 
      return state;
  }
}


/**
 * Action Creators
 */

export function getUsers(id) {
  return {
    type: Types.GET_USERS,
    payload: {
      id
    }
  }
}