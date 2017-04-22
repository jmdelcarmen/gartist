import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER
} from '../../actions/auth/types';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {...state, authenticated: true, error: null};
    case UNAUTH_USER:
      return {...state, authenticated: false, error: null};
    case AUTH_ERROR:
      return {...state, authenticated: false, error: action.errMessage};
  }
  return state;
}
