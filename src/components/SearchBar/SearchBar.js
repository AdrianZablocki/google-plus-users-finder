import React from 'react';

const searchBar = (props) => (
  <form className="Input" onSubmit={props.submited}>
    <input type="text" placeholder="Who are you looking for?" onChange={props.changed} />
    <input type="submit" value="Search" />
  </form>
);

export default searchBar;