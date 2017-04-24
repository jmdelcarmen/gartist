import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import Nav from './dashboard/nav';

class App extends Component {
  renderNav = () => this.props.auth.authenticated
  ? <Nav logout={() => this.props.logoutUser()}/>
  : <div></div>;

  render() {
    return (
      <div className="container">
        {this.renderNav()}
        {this.props.children}
      </div>
    );
  }
}
const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps, actions)(App);
