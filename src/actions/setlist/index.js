import {
  FETCH_SETLIST,
  SAVE_SETLIST_SONG,
  DELETE_SETLIST_SONG
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
export function saveSetlistSong(updatedSong) {
  return (dispatch, getState) => {
    const { setlist } = getState();
    const index = setlist.songs.findIndex(song => song._id === updatedSong._id);
    const updatedSetlist = {
      ...setlist,
      songs: [
        ...setlist.songs.slice(0, index),
        updatedSong,
        ...setlist.songs.slice(index + 1)
      ]
    };
    console.log('updated setlist', updatedSetlist);
    dispatch({ type: SAVE_SETLIST_SONG, payload: updatedSetlist });
  }
}
export function deleteSetlistSong(id, songId) {
  return (dispatch, getState) => {
    axios.get(`${URL}/setlists/${id}/songs/${songId}`)
      .then(
        ({ data }) => {
          dispatch({ type: DELETE_SETLIST_SONG, payload: data });
          console.log('Deleted a song ',data);
        },
        err => {
          console.log(err);
        }
      )
  }
}
