import React from 'react'
import { Link } from "react-router-dom";

const VideogameCard = (props) => {
  return (
    <div>
      <Link to={`/videogames/${props.id}`}>
        <h3>{props.name}</h3>
      </Link>
      <img src={props.image} />
    </div>
  )
}

export default VideogameCard