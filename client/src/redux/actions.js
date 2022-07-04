import axios from "axios"

export function getAllVideogames(){
  return (dispatch)=>{
      return axios("http://localhost:3001/videogames")
      .then(res=>dispatch({type:"GET_VIDEOGAMES",
                            payload: res.data  
                          }))
  }
}

export function getVideogame (id){
  return (dispatch)=>{
    return axios(`http://localhost:3001/videogame/${id}`)
    .then(res=>dispatch({type:"GET_VIDEOGAME",
                           payload: res.data
                          }))
  }
}


export function createVideogame(videogame){
  return {
    type: "CREATE_VIDEOGAME",
    payload: videogame
  }
}

export function getGenres(){

  return (dispatch)=>{
    return axios("http://localhost:3001/genres")
    .then(res=>dispatch({type:"GET_GENRES",
                          payload: res.data  
                        }))
}
  
}