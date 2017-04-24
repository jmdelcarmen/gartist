import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import actions from '../../actions';

import SetlistSongsInputList from './setlist_songs_input_list';

class SetlistSongsEdit extends Component {
  addSongToSetlist = () => this.props.addSongToSetlist(this.props.params.id);
  componentWillMount() {
    const { params: { id }, fetchSetlist, setlist, user } = this.props;
    fetchSetlist(id);
    if (setlist.ownerId !== user._id) {
      browserHistory.push(`/setlists/${id}/view`);
    }
  }
  render() {
    if (!this.props.setlist.songs) {
      return <div className="text-center">Loading...</div>
    }
    const { artist, venue, performanceDate, songs } = this.props.setlist;
    return (
      <div className="container">
        <div className="col-md-8 col-md-offset-2">
          <h2>Edit Setlist - Songs</h2>
          <hr></hr>
          <small>Currently editing: <strong>{artist.name} at {`${venue.name}, ${venue.city}, ${venue.state}`} ({new Date(performanceDate).toDateString()})</strong></small>
          <div className="form-group">
            <button
              className="btn btn-success"
              onClick={this.addSongToSetlist}>
              Add New Song
            </button>
            <br></br>
            <SetlistSongsInputList
              songs={songs}/>
          </div>
          <Link
            to={`/setlists/${this.props.setlist._id}/view`}
            className="btn btn-primary">
            Save
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ setlist: state.setlist, user: state.user });
export default connect(mapStateToProps, actions)(SetlistSongsEdit);
