import React from 'react';

const SearchBox = ({
  onChange,
  onSubmit
}) => (
  <form
    onSubmit={onSubmit}>
    <h1>Search a song</h1>
    <input
      onChange={onChange}/>
  </form>
)
export default SearchBox;
