import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  SET_USER,
  CLEAR_USER
} from './types';
const URL = 'http://localhost:3000'; //node server

export function loginUser({ email, password }) {
  return dispatch => {
    axios.post(`${URL}/login`, { email, password })
      .then(res => {
        dispatch({ type: AUTH_USER }); //update state for authed user
        dispatch({ type: SET_USER, user: res.data.user }); //set user data before navigating
        localStorage.setItem('token', res.data.token); //store token to localStorage
        browserHistory.push('/dashboard');
      })
      .catch(err => dispatch(handleAuthError(err)));
  };
}
export function logoutUser() {
  return dispatch => {
    localStorage.removeItem('token'); //clear token from localStorage
    dispatch({ type: UNAUTH_USER }); //update state for unauthed user
    dispatch({ type: CLEAR_USER });
    browserHistory.push('/');
  };
}
export function signUpUser(user) {
  return (dispatch, getState) => {
    axios.post(`${URL}/signup`, user)
      .then(res => {
        dispatch({ type: AUTH_USER }) //auth user in auth_reducer
        dispatch({ type: SET_USER, user: res.data.user }); //set user data before navigating
        localStorage.setItem('token', res.data.token);
        browserHistory.push('/dashboard');
      })
      .catch(err => dispatch(handleAuthError(err)));
  };
}
export function handleAuthError(err) {
  console.log(err.response.status);
  switch (err.response.status) {
    case 401:
      return { type: AUTH_ERROR, errMessage: 'The information you\'ve entered is incorrect. Forgot password?' };
    case 400:
      return { type: AUTH_ERROR, errMessage: 'Please provide a valid email and password.' }
    case 404:
      return { type: AUTH_ERROR, errMessage: 'Username is already taken.' };
    default:
      return { type: AUTH_ERROR, errMessage: 'Something went wrong.' };
  }
}
