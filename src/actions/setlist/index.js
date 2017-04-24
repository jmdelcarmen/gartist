import axios from 'axios';
import {
  FETCH_SETLIST,
  ADD_SETLIST_SONG,
  SAVE_SETLIST_SONG,
  DELETE_SETLIST_SONG,
  SAVE_SETLIST_SONGS_SORT
} from './types';

const URL = 'http://localhost:3000'

export function saveSetlistSongsSort(songId, direction) {
  return (dispatch, getState) => {
    const { _id, songs } = getState().setlist;
    const index = songs.findIndex(song => song._id === songId);
    const newSetlistSongsSort = direction === 'inc'
      ? [
        ...songs.slice(0, index - 1),
        songs[ index ],
        songs[ index - 1 ],
        ...songs.slice(index + 1)
      ]
      : [
        ...songs.slice(0, index),
        songs[ index + 1 ],
        songs[ index ],
        ...songs.slice(index + 2)
      ];
      axios.post(`${URL}/setlists/${_id}/songs/sort`, { songs: newSetlistSongsSort })
        .then(
          response => {
            dispatch({ type: SAVE_SETLIST_SONGS_SORT, payload: newSetlistSongsSort });
          },
          err => {
            console.log(err);
          }
        )
  }
}
export function fetchSetlist(id) {
  return dispatch => {
    axios.get(`${URL}/setlists/${id}`)
      .then(
        ({ data }) => {
          dispatch({ type: FETCH_SETLIST, payload: data });
        },
        err => {
          console.log(err);
        }
      );
  }
}
export function addSongToSetlist(id) {
  return dispatch => {
    axios.get(`${URL}/setlists/${id}/songs/create`)
      .then(
        ({ data }) => {
          dispatch({ type: ADD_SETLIST_SONG, payload: data });
        },
        err => {
          console.log(err);
        }
      );
  }
}
export function saveSetlistSong(id, songId, updateBody) {
  return dispatch => {
    const options = {
      url: `${URL}/setlists/${id}/songs/${songId}/save`,
      method: 'POST',
      data: updateBody
    };
    axios(options)
      .then(
        ({ data })=> {
        dispatch({ type: SAVE_SETLIST_SONG, payload: data });
      },
      err => {
        console.log(err);
      }
    );
  }
}
export function deleteSetlistSong(id, songId) {
  return dispatch => {
    axios.get(`${URL}/setlists/${id}/songs/${songId}/delete`)
      .then(
        ({ data }) => {
          dispatch({ type: DELETE_SETLIST_SONG, payload: data })
        },
        err => {
          console.log(err);
        }
      )
  }
}
