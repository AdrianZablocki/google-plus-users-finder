import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START,
  };
};

export const fetchUsersSuccess = (data) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: data,
    filteredUsers: data
  };
};

export const fetchUsersFail = (error) => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    error: error
  };
};

export const fetchUsers = (id, limit) => {
  const apiKey = 'AIzaSyCCKlHxvBE3tfd3-58_UpkUa7WNqVuACOc'
  return dispatch => {
    dispatch(fetchUsersStart());
    axios.get('https://www.googleapis.com/plus/v1/people?query=' + id + '&maxResults=' + limit + '&key=' + apiKey)
      .then(response => {
        const users = response.data.items;
        let updatedUsers = null;
        if(users.length === undefined) {
          updatedUsers = users
        } else {
          updatedUsers = users.map(user => {
            return {
              ...user
            }
          });
        }
        dispatch(fetchUsersSuccess(updatedUsers));
      })
      .catch(error => {
        dispatch(fetchUsersFail(error))
      })
  };
};

export const inputHandler = (event) => {
  return {
    type: actionTypes.INPUT_HANDLER,
    value: event.target.value
  };
};