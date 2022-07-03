import axios from "axios"

export function getAllVideogames(){
  return (dispatch)=>{
      return axios("http://localhost:3001/videogames")
      .then(res=>dispatch({type:"GET_VIDEOGAMES",
                            payload: res.data  
                          }))
  }
}