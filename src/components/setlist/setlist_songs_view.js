import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class SetlistSongsView extends Component {
  renderSetlistEditButton = () => {
    const { setlist, user } = this.props;
    return setlist.ownerId === user._id
      ? <Link to={`/setlists/${setlist._id}/edit`} className="btn btn-info">Edit</Link>
      : <div></div>;
  }
  render() {
    if (!this.props.setlist.songs) {
      return <div>Loading Setlist</div>;
    }
    const { _id, artist, performanceDate, songs, venue, comment, thumbnailUrl } = this.props.setlist;
    return (
      <div className="card col-md-6">
        <div className="text-xs-right">
          {this.renderSetlistEditButton()}
        </div>
        <img className="card-img-top" src={thumbnailUrl} alt="artist-image" />
        <div className="card-block">
          <h4 className="card-title">{artist.name}</h4>
          <small>{`${venue.name}, ${venue.city}, ${venue.state} - ${new Date(performanceDate).toDateString()}`}</small>
          <p className="card-text">{comment}</p>
        </div>
        <br></br>
        <strong>Setlist</strong>
        <ul className="list-group list-group-flush">
          {songs.map(song => <li key={song._id} className="list-group-item">{song.name}<br></br>{song.unreleased ? <small>(Unreleased)</small> : ''}</li>)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({ setlist: state.setlist, user: state.user });
export default connect(mapStateToProps, null)(SetlistSongsView);
