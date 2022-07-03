import React from 'react'
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getAllVideogames} from "../redux/actions"


function Home() {

  const dispatch = useDispatch()
  const videogames = useSelector(state=>state.videogames)

  useEffect(()=>{

    dispatch(getAllVideogames())

  },[])


  return (
    <div>
      {videogames && videogames.map(v=>{

        return (

          <div key={v.id}>
            {v.name}
          </div>

        )

      })}
    </div>
  )
}

export default Home