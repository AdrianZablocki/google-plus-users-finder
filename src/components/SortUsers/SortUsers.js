import React from 'react';

import SelectOption from '../UI/SelectOption/SelectOption';

const sortUsers = (props) => {
  let options = props.sortOptions;
  
  options = options.map((option) => {
    return <SelectOption key={'count' + option}value={option}/>
  });

  return(
    <div className="Sort">
      <label>Sort by:</label>
      <select onChange={props.sort}>
        {options}
      </select>
    </div>  
  )
};

export default sortUsers;