import React from 'react';

import './User.css';

const user = (props) => (
  <article className="User">
    <img src={props.imgSrc} alt={props.name} title={props.name} />
    <h2>{props.name}</h2>
    <a href={props.link} target="_blanc">User profile</a>
    <label>ulubione</label>
    <input type="checkbox" id={props.id} onChange={props.changed}/>        
  </article>
);

export default user;