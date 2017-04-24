import {
  FETCH_SETLIST,
  ADD_SETLIST_SONG,
  SAVE_SETLIST_SONG,
  DELETE_SETLIST_SONG,
  SAVE_SETLIST_SONGS_SORT
} from '../../actions/setlist/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SETLIST:
      return action.payload;
    case ADD_SETLIST_SONG:
      return { ...state, songs: action.payload };
    case SAVE_SETLIST_SONG:
      return { ...state, songs: action.payload };
    case DELETE_SETLIST_SONG:
      return { ...state, songs: action.payload };
    case SAVE_SETLIST_SONGS_SORT:
      return { ...state, songs: action.payload };
  }
  return state;
}
