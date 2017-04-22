import React from 'react';
import { Link } from 'react-router';

const Nav = ({
  logout
}) => (
  <ul className="flex-row">
    <li
      onClick={logout}
      className="btn btn-danger">Logout</li>
    <Link
      to="/setlists/create"
      className="btn btn-success">Add Setlist</Link>
  </ul>
);

export default Nav;
