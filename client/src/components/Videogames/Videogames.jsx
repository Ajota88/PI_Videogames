import React from 'react'
import { getAllVideogames } from '../../redux/actions'
import VideogameCard from "../VideogameCard/VideogameCard"
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"


const Videogames = () => {

  const dispatch = useDispatch()
  const videogames = useSelector(state=>state.videogames)

  useEffect(()=>{

    dispatch(getAllVideogames())

  },[])

  return (
    <div>
      <h1>Videogames API</h1>
      <br />
      <h3>Videogames</h3>
      <br />
      {videogames && videogames.map(v=>(
        <VideogameCard
        key={v.id}
        id={v.id}
        name={v.name}
        rating={v.rating}
        image={v.image}
        genres={v.genres}
         />
      ))}
    </div>
  )
}

export default Videogames