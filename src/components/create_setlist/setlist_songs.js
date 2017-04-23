import React, { Component } from 'react';
import actions from '../../actions';
import { connect } from 'react-redux';
import axios from 'axios';

import SetlistSongsInputList from './setlist_songs_input_list';

class SetlistSongs extends Component {
  constructor (props) {
    super(props);
    this.state = {
      setlist: {},
    };
  };
  addNewSong = () => {
    axios.get(`http://localhost:3000/setlists/${this.props.params.id}/songs/create`)
      .then(({ data }) => {
        this.setState({ setlist: { ...this.state.setlist, songs: [ ...this.state.setlist.songs, data ] } });
      })
      .catch(err => console.log(err));
  }
  componentWillMount() {
    axios.get(`http://localhost:3000/setlists/${this.props.params.id}`)
      .then(({ data }) => this.setState({ setlist: data }))
      .catch(err => console.log(err));
  }
  //shouldComponentUpdate
  render() {
    if (!this.state.setlist.songs) {
      return <div className="text-center">Loading...</div>
    }
    console.log(this.state);
    const { artist, venue, performanceDate } = this.state.setlist;
    return (
      <div className="container">
        <div className="col-md-8 col-md-offset-2">
          <h2>Edit Setlist - Songs</h2>
          <hr></hr>
          <small>Currently editing: <strong>{artist.name} at {`${venue.name}, ${venue.city}, ${venue.state}`} ({new Date(performanceDate).toDateString()})</strong></small>
          <div className="form-group">
            <button
              className="btn btn-success"
              onClick={this.addNewSong}>
              Add New Song
            </button>
            <br></br>
            <SetlistSongsInputList songs={this.state.setlist.songs} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(SetlistSongs);
