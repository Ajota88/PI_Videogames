import axios from "axios"

export function getAllVideogames(){
  return (dispatch)=>{
      return axios("http://localhost:3001/videogames")
      .then(res=>dispatch({type:"GET_VIDEOGAMES",
                            payload: res.data  
                          }))
                          .catch(err => {
                           return alert(
                            "Error trying to acces Data Base,please check your internet connection or try later.")
                          });
  }
}

export function getVideogamesByName (name){
  return (dispatch)=>{
    return axios(`http://localhost:3001/videogames?name=${name}`)
    .then(res=>dispatch({
                          type:"GET_BY_NAME",
                          payload: res.data
                        }))
    .catch(err => {
              dispatch({
                type: "SEARCH_ERROR",
              })
            });
}
}

export function getVideogame (id){
  return (dispatch)=>{
    return axios(`http://localhost:3001/videogame/${id}`)
    .then(res=>dispatch({type:"GET_VIDEOGAME",
                           payload: res.data
                          }))
    .catch(err => {
      dispatch({
        type: "ID_ERROR",
      })
    });
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

export function sortByAlphabet(payload){
  return {

    type: "SORT_BY_ALPHABET",
    payload

  }
 
}

export function sortByRating(payload){
  return {

    type: "SORT_BY_RATING",
    payload

  }
 
}

export function clearDetail(){
  return{
    type: "CLEAR_DETAIL"
    
  }
}

export function filterByGenre(genre){
  return{
    type: "FILTER_BY_GENRE",
    payload:genre
  }
}

export function resetFilter(){
  return{
    type : "RESET_FILTER"
  }
}

export function reloadDB(){
  return{
    type : "RELOAD_DB"
  }
}

export function showAdded(){
  return{
    type: "SHOW_ADDED"
  }
}

