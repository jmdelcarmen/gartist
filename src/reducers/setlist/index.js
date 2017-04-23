import {
  FETCH_SETLIST,
  SAVE_SETLIST_SONG,
  DELETE_SETLIST_SONG
} from '../../actions/setlist/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SETLIST:
      return action.payload;
    case SAVE_SETLIST_SONG:
      return action.payload;
    case DELETE_SETLIST_SONG:
      return action.payload;
  }
  return state;
}
