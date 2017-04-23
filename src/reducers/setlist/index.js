import {
  FETCH_SETLIST
} from '../../actions/setlist/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SETLIST:
      return action.payload;
  }
  return state;
}
