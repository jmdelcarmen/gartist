import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

class SetlistSongsInputList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      song: { ...this.props.song }
    }
  }
  saveSong = () => {
    const { song, saveSetlistSong, setlistId } = this.props;
    const updateBody = this.state.song
    saveSetlistSong(setlistId, song._id, updateBody);
    this.setState({ active: false });
  }
  deleteSong = () => {
    const { song, deleteSetlistSong, setlistId } = this.props;
    deleteSetlistSong(setlistId, song._id);
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
const mapStateToProps = state => ({ setlistId: state.setlist._id });
export default connect(mapStateToProps, actions)(SetlistSongsInputList);
