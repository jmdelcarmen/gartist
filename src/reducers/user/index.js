import {
  SET_USER,
  CLEAR_USER
} from '../../actions/auth/types';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case CLEAR_USER:
      return {}
  }
  return state;
}
