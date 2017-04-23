import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

class SetlistSongsInputList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    }
  }
  saveSong = () => {
    const { song, saveSetlistSong, setlistId } = this.props;
    // const updatedSong = { ...song, };
    console.log('hi');
    saveSetlistSong(setlistid, song._id, updateBody);
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
          className="btn btn-info">
          Edit
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
      <div className="form-group">
        <input
          onFocus={() => this.setState({ active: true })}
          className="form-control col-md-6" />
        {this.renderActionButtons()}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  setlistId: state.setlist._id
});
export default connect(mapStateToProps, actions)(SetlistSongsInputList);
