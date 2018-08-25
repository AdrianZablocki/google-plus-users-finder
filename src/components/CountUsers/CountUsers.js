import React from 'react';

import SelectOption from '../UI/SelectOption/SelectOption';
import classes from './CountUsers.css';

const countUsers = (props) => {
  let options = props.countOptions;
  
  options = options.map((option) => {
    return <SelectOption key={'count' + option}value={option}/>
  });

  return(
    <div className={classes.Count}>
      <label className={classes.CountLabel}>Results:</label>
      <select className={classes.CountSelect} onChange={props.count}>
        {options}
      </select>
    </div>  
  )
};

export default countUsers;