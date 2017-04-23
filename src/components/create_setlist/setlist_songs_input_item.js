import React, { Component } from 'react';
import { browserHistory } from 'react-router';



class SetlistSongsInputList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    }
  }
  renderActionButtons = () => {
    return this.state.active
    ? (
      <div>
        <button
          onClick={this.props.saveSong}
          className="btn btn-danger">
          Delete
        </button>
        <button
          className="btn btn-info">
          Edit
        </button>
        <button
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

export default SetlistSongsInputList;
