import React from 'react';

import SelectOption from '../UI/SelectOption/SelectOption';

const countUsers = (props) => {
  let options = props.countOptions;
  
  options = options.map((option) => {
    return <SelectOption key={'count' + option}value={option}/>
  });

  return(
    <div className="Count">
      <label>Number of results:</label>
      <select onChange={props.count}>
        {options}
      </select>
    </div>  
  )
};

export default countUsers;