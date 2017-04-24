import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import StateSelect from '../util_components/state_select';


class SetlistForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }
  initialState = () => ({
    performanceDate: moment(),
    venue: {},
    songs: [],
    artist: '',
    comment: '',
    thumbnailUrl: '',
  });
  resetState = () => this.setState(this.initialState());
  createSetlist = e => {
    e.preventDefault();
    const setlist = this.state;
    const createSetlistOptions = {
      method: 'POST',
      url: 'http://localhost:3000/setlists/create',
      data: setlist,
    };
    axios(createSetlistOptions)
      .then(response => {
        this.resetState();
        browserHistory.push(`/setlists/${response.data.id}/edit`);
      })
      .catch(err => {
        //dispatch error to redux;
        console.log(err);
      });
  }
  render() {
    return(
      <div className="container">
        <form onSubmit={this.createSetlist}>
          <div className="col-md-6">
            <h1>Add Setlist</h1>
            <hr></hr>
            <div className="form-group">
              <h5>Artist</h5>
              <input
                required
                className="form-control"
                type="text"
                onChange={() => this.setState({ artist: this.artist.value })}
                ref={artist => this.artist = artist} />
            </div>
            <div className="form-group">
              <h5>Venue</h5>
              <div className="form-group col-md-6">
                <label>Name</label>
                <input
                  required
                  className="form-control"
                  type="text"
                  onChange={() => this.setState({ venue: { ...this.state.venue, name: this.venueName.value } })}
                  ref={venue => this.venueName = venue} />
              </div>
              <div className="form-group col-md-3">
                <label>City</label>
                <input
                  required
                  className="form-control"
                  type="text"
                  onChange={() => this.setState({ venue: { ...this.state.venue, city: this.city.value } })}
                  ref={city => this.city = city} />
              </div>
              <div className="form-group col-md-3">
                <label>State</label>
                <StateSelect
                  onChange={e => this.setState({ venue: { ...this.state.venue, state: e.target.value } })}/>
              </div>
            </div>
            <div className="form-group">
              <h5>Event Date</h5>
              <DatePicker
                selected={this.state.performanceDate}
                onChange={date => this.setState({ performanceDate: date })}/>
            </div>
            <div className="form-group">
              <h5>Edit Comment</h5>
              <textarea
                required
                className="form-control"
                onChange={() => this.setState({ comment: this.comment.value })}
                ref={comment => this.comment = comment}/>
            </div>
            <div className="form-group">
              <h5>Thumbnail URL</h5>
                <input
                  required
                  className="form-control"
                  type="text"
                  onChange={() => this.setState({ thumbnailUrl: this.thumbnailUrl.value })}
                  ref={thumbnailUrl => this.thumbnailUrl = thumbnailUrl} />
            </div>
            <button className="btn btn-primary">
              Create Setlist
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SetlistForm;
