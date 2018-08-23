import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchUsersStart = (id) => {
  return {
    type: actionTypes.FETCH_USERS_START,
    id: id
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
    users: error
  };
};

export const inputHandler = (event) => {
  return {
    type: actionTypes.INPUT_HANDLER,
    value: event.target.value
  };
};

export const fetchUsers = (id) => {
  return dispatch => {
    dispatch(fetchUsersStart(id));
    axios.get('https://www.googleapis.com/plus/v1/people?query=' + id + '&maxResults=50&key=AIzaSyCCKlHxvBE3tfd3-58_UpkUa7WNqVuACOc')
      .then(response => {
        console.log(response)
        const users = response.data.items;
        const updatedUsers = users.map(user => {
          return {
            ...user
          }
        });
        dispatch(fetchUsersSuccess(updatedUsers));
      })
      .catch(error => {
        dispatch(fetchUsersFail(error))
      })
  };
};
