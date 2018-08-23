import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialstate = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: false,
};

const fetchUsersStart = (state, action) => {
  return updateObject(state, {loading: true})
};

const fetchUsersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    users: action.users,
    filteredUsers: action.filteredUsers
  });
};

const fetchUsersFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  });
};

const reducer = (state = initialstate, action) => {
  switch(action.type) {
    case actionTypes.FETCH_USERS_START: return fetchUsersStart(state, action);
    case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state, action);
    default: return state
  }
};

export default reducer;