import React from 'react'
import { Link } from "react-router-dom";
import "./style.scss";
import defaultImage from "../../recursos/imagenes/default_poster.jpg"

const VideogameCard = (props) => {
  
  return (
  
        <Link to={`/videogames/${props.id}`} className="videogame">
          <article>
           <img src={props.image?props.image:defaultImage} />
            <div className='videogame-info'>
              <h2>{props.name}</h2>
              <div className='videogame_genres'>
              {props.genres && props.genres.map(genre=>{
                //console.log(genre)
                return <p key={genre.id}>{genre.name}</p>
          
              })}
              </div>
            </div>
          </article>
        </Link>
      
       
    
    
  )
}

export default VideogameCard