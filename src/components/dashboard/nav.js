import React from 'react';
import { Link } from 'react-router';

const Nav = ({
  logout
}) => (
  <div className="main-nav">
    <Link
      to="/dashboard"
      className="btn btn-primary">Dashboard</Link>
    <Link
      to="/setlists/create"
      className="btn btn-success">Add Setlist</Link>
    <button
      onClick={logout}
      className="btn btn-danger pull-right">Logout</button>
  </div>
);

export default Nav;
