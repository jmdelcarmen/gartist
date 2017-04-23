import {
  FETCH_SETLIST
} from './types';
import axios from 'axios';
const URL = 'http://localhost:3000'

export function fetchSetlist(id) {
  return (dispatch, getState) => {
    axios.get(`${URL}/setlists/${id}`)
      .then(
        ({ data }) => {
          dispatch({ type: FETCH_SETLIST, payload: data });
          console.log('Fresh setlist ', getState());
        },
        err => {
          console.log(err);
        }
      );
  }
}
export function addSongToSetlist(id) {
  return (dispatch, getState) => {
    axios.get(`${URL}/setlists${id}/songs/create`)
      .then(
        ({ data }) => {
          fetchSetlist(id);
          console.log('Created a new song ', getState());
        },
        err => {
          console.log(err);
        }
      );
  }
}
