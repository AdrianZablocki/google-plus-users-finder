import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialstate = {
  users: [],
  filteredUsers: [],
  value: 'geek',
  loading: false,
  error: false
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

const inputHandler = (state, action) => {
  return updateObject(state, {
    value: action.value
  });
};

const countHandler = (state, action) => {
  const countedUsers = state.users.slice(0, action.count);
  return updateObject(state, {
    filteredUsers: countedUsers
  })
};

const favoritesHandler = (state, action) => {
  let updatedUsers = state.users.map(user => {
    if(user.id === action.id) {
      return updateObject(user, {
        ...user,
        isFavorites: action.isChecked
      });
    }
    return updateObject(user, {
      ...user,
    });

  });
  return updateObject(state, {
    users: updatedUsers
  });
}

const sortHandler = (state, action) => {
  let sortedUsers;
  switch(action.sort) {
    case 'All':
      sortedUsers = state.users;
      break;
    case 'Name':
      sortedUsers = [].concat(state.filteredUsers).sort((a, b) => {
        const textA = a.displayName.toUpperCase();
        const textB = b.displayName.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      break;
    case 'Favorites':
      sortedUsers = state.users.filter((user) => {
        return user.isFavorites;
      });
      break;
    default: return sortedUsers;
  }
  return updateObject(state, {
    filteredUsers: sortedUsers
  })
}

const reducer = (state = initialstate, action) => {
  switch(action.type) {
    case actionTypes.FETCH_USERS_START: return fetchUsersStart(state, action);
    case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state, action);
    case actionTypes.INPUT_HANDLER: return inputHandler(state, action);
    case actionTypes.COUNT_HANDLER: return countHandler(state, action);
    case actionTypes.SORT_HANDLER: return sortHandler(state, action);
    case actionTypes.ADD_TO_FAVORITES_HANDLER: return favoritesHandler(state, action);
    default: return state
  }
};

export default reducer;