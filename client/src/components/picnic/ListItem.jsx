import React from "react";
import { Link } from "react-router-dom";

const ListItem = (props) => {
  return (
    <div className="profile bg-light">
      <div>
        <h2>{props.picnic_name}</h2>
        <p>{props.planed_date} at</p>
        <p className="my-1">{props.place && <span>{props.place}</span>}</p>
        <Link to={`/picnic/${props.id}`} className="btn btn-primary">
          View Picnic
        </Link>
      </div>
      <ul></ul>
      <ul>
        <h3>Participations</h3>
        {props.participations.map((name, index) => (
          <li key={index} className="text-primary">
            <i /> {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListItem;
