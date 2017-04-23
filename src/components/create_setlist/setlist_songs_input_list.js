import React from 'react';
import SetlistSongsInputItem from './setlist_songs_input_item';

const SetlistSongsInputList = ({
  songs,
  saveSong,
  deleteSong
}) => (
  <div>
    {songs.map(song => (
      <SetlistSongsInputItem
        key={song._id}
        song={song}
        saveSong={saveSong}
        deleteSong={deleteSong} />
    ))}
  </div>
)

export default SetlistSongsInputList;
