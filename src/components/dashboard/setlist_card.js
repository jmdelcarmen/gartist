import React from 'react';
import { Link } from 'react-router';

const SetlistCard = ({
  setlist: { _id, artist, performanceDate, songs, venue, comment }
}) => (
  <div className="card col-md-4">
    <img className="card-img-top" src="" alt="" />
    <div className="card-block">
      <h4 className="card-title">{artist.name}</h4>
      <small>{`${venue.name} ${new Date(performanceDate)}`}</small>
    </div>
    <div className="card-block">
      <Link to={`/setlists/${_id}`} className="card-link">View Setlist</Link>
    </div>
  </div>
)
export default SetlistCard;
