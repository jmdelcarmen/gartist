import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import actions from '../../actions';

class SetlistCard extends Component {
  render() {
    const { _id, artist, performanceDate, songs, venue, comment, thumbnailUrl } = this.props.setlist;
    return (
      <div className="card col-md-4">
        <img className="card-img-top" src={thumbnailUrl} alt="" />
        <div className="card-block">
          <h4 className="card-title text-xs-center">{artist.name}</h4>
          <hr></hr>
          <div className="text-xs-center">
            <small>{`${venue.name} ${new Date(performanceDate).getFullYear()} - ${new Date(performanceDate).toDateString()}`}</small>
          </div>
        </div>
        <div className="card-block">
          <a
            onClick={() => {
              this.props.fetchSetlist(_id);
              browserHistory.push(`/setlists/${_id}/view`);
            }}
            className="card-link btn btn-block btn-primary">
            View Setlist
          </a>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(SetlistCard);
