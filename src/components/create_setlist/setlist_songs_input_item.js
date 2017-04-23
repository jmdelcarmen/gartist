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
  renderActionButtons = () => {
    return this.state.active
    ? (
      <div>
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
        <div className="col-md-8">
        <input
          value={this.state.song.name}
          ref={songName => this.songName = songName}
          onChange={() => this.setState({ song: { name: this.songName.value } })}
          onFocus={() => this.setState({ active: true })}
          className="form-control"/>
        </div>
        {this.renderActionButtons()}
      </div>
    );
  }
}
const mapStateToProps = state => ({ setlistId: state.setlist._id });
export default connect(mapStateToProps, actions)(SetlistSongsInputList);
