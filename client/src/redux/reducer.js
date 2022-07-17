import { sortAsc, sortDesc  } from "../utils";

const initialState ={
  videogames: [],
  videogame: [],
  genres: [],
  dataFilter:[],
  filterSelected:false,
  searchFailed:false,
  idError:false,
  loadingPage:true
  
}

function reducer(state=initialState,action){
  switch(action.type){
    case "GET_VIDEOGAMES":
        return {
          ...state,
          videogames: action.payload
        };
    
    case "GET_BY_NAME":
      return {
        ...state,
        videogames: action.payload,
        filterSelected: false
      }

    case "SEARCH_ERROR":
        return{
          ...state,
          searchFailed:true
        }
    case "RELOAD_DB":
      return{
        ...state,
        searchFailed:false
      }

    case "GET_VIDEOGAME":
        return {
          ...state,
          videogame: action.payload,
          idError:false
        };

    case "ID_ERROR":
      return{
        ...state,
        idError:true
      }

      case "GET_GENRES":
        return {
          ...state,
          genres: action.payload
        };

      case "SORT_BY_ALPHABET":
        const sortByAlphabetState = [...state.videogames]
        let sortedAlphabetArr =
        action.payload === "asc"
          ? sortAsc(sortByAlphabetState, "name")
          : sortDesc(sortByAlphabetState, "name");
        return{
          ...state,
          videogames: sortedAlphabetArr
        } 

      case "SORT_BY_RATING":
      
      const sortByRating = [...state.videogames]
      let sortedRatingArr=
      action.payload === "asc"
      ? sortAsc(sortByRating, "rating")
      : sortDesc(sortByRating, "rating")
        return {
          ...state,
          videogames: sortedRatingArr
        };

      case "FILTER_BY_GENRE":
        if(action.payload.genre || action.payload.origin){
          let filterVideogame = [...state.videogames]
          //console.log(action.payload)
          if(action.payload.genre){
            filterVideogame = filterVideogame.filter(v=>{
              let videogameGenre = v.genres.map(g=>g.name)
              return videogameGenre.includes(action.payload.genre)
            })
          }
          if(action.payload.origin){
            filterVideogame = filterVideogame.filter(v=>{
              if(action.payload.origin === "api"){
                return v.id < 1000000
              }else return v.id >= 1000000
            })
          }
          //console.log(filterVideogame)
          return{
            ...state,
            dataFilter:filterVideogame,
            filterSelected: true
          }
      };
     

      case "RESET_FILTER"  :
        return{
          ...state,
          filterSelected: false
        }

      case "SHOW_ADDED":
        let videogamesAdded = [...state.videogames]
        videogamesAdded = videogamesAdded.filter(v=>v.id>=1000000)
        //console.log(videogamesAdded)
        return{
          ...state,
          videogames: videogamesAdded
        }

      case "CLEAR_DETAIL":
        return{
          ...state,
          videogame:[]
        }
      
      default: return state
  }
}

export default reducer