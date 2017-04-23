import React from 'react';
import SetlistSongsInputItem from './setlist_songs_input_item';

const SetlistSongsInputList = ({
  songs
}) => (
  <div>
    {songs.map(song => <SetlistSongsInputItem key={song._id} song={song}/>)}
  </div>
)

export default SetlistSongsInputList;
