import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getVideogame } from '../../redux/actions';

const DetailCard = (props) => {

  console.log("estoy en el detalle")

  let id = props.match.params.videogameId;

  const dispatch = useDispatch();

  React.useEffect(() => {
   
    dispatch(getVideogame(id));
  }, []);

  const videogame = useSelector((state) => state.videogame);

  return (
    <div>
      <h1>Videogame Detail</h1>
      <h3>{videogame.name}</h3>
      <br />
      <img src={videogame.image} />
    </div>
  )
}

export default DetailCard