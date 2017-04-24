import React, { Component } from 'react';
import { connect } from 'react-redux';

class SetlistSongsView extends Component {
  render() {
    if (!this.props.setlist.songs) {
      return <div>Loading Setlist</div>;
    }
    const { _id, artist, performanceDate, songs, venue, comment, thumbnailUrl } = this.props.setlist;
    return (
      <div className="card col-md-6">
        <img className="card-img-top" src={thumbnailUrl} alt="artist-image" />
        <div className="card-block">
          <h4 className="card-title">{artist.name}</h4>
          <small>{`${venue.name}, ${venue.city}, ${venue.state} - ${new Date(performanceDate).toDateString()}`}</small>
          <p className="card-text">{comment}</p>
        </div>
        <ul className="list-group list-group-flush">
          {songs.map(song => <li key={song._id} className="list-group-item">{song.name}</li>)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({ setlist: state.setlist });
export default connect(mapStateToProps, null)(SetlistSongsView);
