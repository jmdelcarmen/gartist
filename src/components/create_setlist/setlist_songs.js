import React, { Component } from 'react';
import actions from '../../actions';
import { connect } from 'react-redux';
import axios from 'axios';

import SetlistSongsInputList from './setlist_songs_input_list';

class SetlistSongs extends Component {
  addSongToSetlist = () => this.props.addSongToSetlist(this.props.params.id);
  componentWillMount() {
    const { params: { id }, fetchSetlist } = this.props;
    fetchSetlist(id);
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
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ setlist: state.setlist });
export default connect(mapStateToProps, actions)(SetlistSongs);
