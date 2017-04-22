import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import Nav from './nav';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard Here</h1>
        <Nav
          logout={() => this.props.logoutUser()}/>
      </div>
    );
  }
}

export default connect(null, actions)(Dashboard);
