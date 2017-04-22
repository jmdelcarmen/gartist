import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import StateSelect from '../util_components/state_select';


class SetlistForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      performanceDate: moment(),
      artist: '',
      venue: {
        name: '',
        city: '',
        usState: '',
      },
      songs: [],
    };
  }
  render() {
    console.log(this.state);
    return(
      <div className="container">
        <div className="col-md-6">
          <h1>Add Setlist</h1>
          <hr></hr>
          <div className="form-group">
            <h5>Artist</h5>
            <input
              className="form-control"
              type="text"
              onChange={() => this.setState({ artist: this.artist.value })}
              ref={artist => this.artist = artist} />
          </div>
          <div className="form-group">
            <h5>Venue</h5>
            <div className="form-group col-md-8">
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                onChange={() => this.setState({ venue: { ...this.state.venue, name: this.venueName.value } })}
                ref={venue => this.venueName = venue} />
            </div>
            <div className="form-group col-md-3">
              <label>City</label>
              <input
                className="form-control"
                type="text"
                onChange={() => this.setState({ venue: { ...this.state.venue, city: this.city.value } })}
                ref={city => this.city = city} />
            </div>
            <div className="form-group col-md-1">
              <label>State</label>
              <StateSelect
                onChange={e => this.setState({ venue: { ...this.state.venue, usState: e.target.value } })}/>
            </div>
          </div>
          <div className="form-group">
            <h5>Event Date</h5>
            <DatePicker
              selected={this.state.performanceDate}
              onChange={date => this.setState({ performanceDate: date })}/>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(null, actions)(SetlistForm);
