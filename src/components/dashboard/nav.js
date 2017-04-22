import React from 'react';

const Nav = ({
  logout
}) => (
  <ul className="flex-row">
    <li
      onClick={logout}
      className="btn btn-danger">Logout</li>
    <li
      className="btn btn-primary">Create Setlist</li>
  </ul>
);

export default Nav;
