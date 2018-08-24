import React from 'react';

const user = (props) => (
  <article className="User">
    <img src={props.imgSrc} alt={props.name} title={props.name} />
    <h2>{props.name}</h2>
    <a href={props.link} target="_blanc">User profile</a>
    <label>ulubione</label>
    <input type="checkbox" id="id" onChange={props.changed}/>        
  </article>
);

export default user;