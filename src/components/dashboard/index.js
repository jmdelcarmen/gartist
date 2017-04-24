import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

import Nav from './nav';
import Setlists from './setlists';

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <h1>Dashboard Here</h1>
        <Setlists />
      </div>
    );
  }
}

export default connect(null, actions)(Dashboard);
