import React from 'react';

const SetlistCard = ({
  setlist: { artist, performanceDate, songs, venue, comment }
}) => (
  <div className="card col-md-4">
    <img className="card-img-top" src="" alt="" />
    <div className="card-block">
      <h4 className="card-title">{artist.name}</h4>
      <small>{`${venue.name} ${new Date(performanceDate)}`}</small>
      <p className="card-text">{comment}</p>
    </div>
    <ul className="list-group list-group-flush">
      {songs.map(song => <li key={song._id} className="list-group-item">{song.name}</li>)}
    </ul>
    <div className="card-block">
      <a href="#" className="card-link">Card link</a>
      <a href="#" className="card-link">Another link</a>
    </div>
  </div>
)
export default SetlistCard;
