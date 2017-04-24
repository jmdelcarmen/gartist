import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import actions from '../../actions';

class SetlistSongsInputList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      song: { ...this.props.song }
    }
  }
  incSongPosition = () => this.props.saveSetlistSongsSort(this.state.song._id, 'inc');
  decSongPosition = () => this.props.saveSetlistSongsSort(this.state.song._id, 'dec');
  saveSong = () => {
    const { song, saveSetlistSong, setlist } = this.props;
    const updateBody = this.state.song
    saveSetlistSong(setlist._id, song._id, updateBody);
    this.setState({ active: false });
  }
  deleteSong = () => {
    const { song, deleteSetlistSong, setlist } = this.props;
    deleteSetlistSong(setlist._id, song._id);
  }
  renderPositionButtons = () => {
    const songIndex = this.props.setlist.songs.findIndex(song => song._id === this.state.song._id);
    const songsLength = this.props.setlist.songs.length;
    switch (songIndex) {
      case 0:
        return (
          <button
            onClick={this.decSongPosition}
            className="btn btn-default">
            Down
          </button>
        );
      case songsLength - 1:
        return (
          <button
            onClick={this.incSongPosition}
            className="btn btn-default">
            Up
          </button>
        );
      default:
        return (
          <div>
            <button
              onClick={this.decSongPosition}
              className="btn btn-default">
              Down
            </button>
            <button
              onClick={this.incSongPosition}
              className="btn btn-default">
              Up
            </button>
          </div>
        );
    }
  }
  renderLyricsTextArea = () => {
    return this.state.active
    ? (
      <div className="col-md-12">
        <p>Lyrics</p>
        <textarea
          ref={lyrics => this.lyrics = lyrics}
          placeholder="Enter the lyrics to this song"
          className="form-control"
          onChange={() => this.setState({ song: { ...this.state.song, lyrics: this.lyrics.value } })}>
        </textarea>
      </div>
    )
    : <div></div>
  }
  renderUnreleasedCheckBox = () => {
    return this.state.active
    ? (
      <div className="col-md-6">
        <p>This song is unreleased</p>
        <input
          type="checkbox"
          ref={unreleased => this.unreleased = unreleased}
          onChange={() => this.setState({ song: { ...this.state.song, unreleased: this.unreleased.checked } })}
          className="form-control"/>
      </div>
    )
    : <div></div>
  }
  renderActionButtons = () => {
    return this.state.active
    ? (
      <div className="col-md-6">
        <button
          onClick={this.deleteSong}
          className="btn btn-danger">
          Delete
        </button>
        <button
          onClick={this.saveSong}
          className="btn btn-primary">
          Save
        </button>
        {this.renderPositionButtons()}
      </div>
    )
    : <div></div>;
  }
  render() {
    return (
      <div className="form-group row">
        <div className="col-md-12">
        <input
          value={this.state.song.name}
          ref={songName => this.songName = songName}
          onChange={() => this.setState({ song: { ...this.state.song, name: this.songName.value } })}
          onFocus={() => this.setState({ active: true })}
          className="form-control"/>
        </div>
        <div className="col-md-12">
          {this.renderUnreleasedCheckBox()}
          {this.renderActionButtons()}
          {this.renderLyricsTextArea()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ setlist: state.setlist });
export default connect(mapStateToProps, actions)(SetlistSongsInputList);
