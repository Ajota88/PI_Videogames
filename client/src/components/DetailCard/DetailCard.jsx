import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getVideogame,clearDetail } from '../../redux/actions';
import "./style.scss";
import defaultImage from "../../recursos/imagenes/default_poster.jpg"
import Spinner from '../Spinner/Spinner';
import NotFound from '../NotFound/NotFound';


const DetailCard = (props) => {

  const videogame = useSelector((state) => state.videogame);
  //console.log(videogame)

  let id = props.match.params.videogameId;

  const[loading,setLoading]=React.useState(true)

  let idError=useSelector(state=>state.idError)

  const dispatch = useDispatch();

  React.useEffect(() => {
   
    dispatch(getVideogame(id));

    return dispatch(clearDetail())
  }, []);

  React.useEffect(() => {
   
    return setLoading(true)
  }, []);


  
  if(Object.keys(videogame).length>0 && loading){
    setLoading(false)
   }

  
  let genres= videogame.id>=1000000?videogame.genres.map(g=>g.name):videogame.genres

  return (
    <div>
     
    {loading?<Spinner /> :<section className='single-videogame' style={{backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),url('${videogame.image?videogame.image:defaultImage}')`}}>
     
      <div className='single-videogame-info'>
        <h1>{videogame.name}</h1>
        <div className='date-rating'>
          <h4>Released : {videogame.releaseDate}</h4>
          <h4>Rating : {videogame.rating} </h4>
        </div>
        <div className='videogame_genres'>
          <h2>Genres</h2>
          <ul className={`videogame_genres`}>
            {genres &&
              genres.map((genre,index) => {
                console.log(genre)
                return <li key={index}>{genre}</li>;
              })}
          </ul>
        </div>
        <div className="videogame_description">
          <h2>Description</h2>
          <p>{videogame.description}</p>
        </div>
        <div className='videogame_plataform'>
          <h3>Available Platforms</h3>
          <ul>
            {videogame.platforms &&
              videogame.platforms.map((element, index) => {
                return <li key={index}>{element}</li> 
              })}
          </ul>
        </div>
        <Link to={"/HOME"} >
         <button className="btn-back">BACK HOME</button>
        </Link>
      </div>
    </section>}
    {idError===true && <NotFound />}
    </div>
  )
}

export default DetailCard