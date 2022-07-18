import React from 'react'
import { useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import "./Style.scss"
import { filterByGenre,resetFilter,getAllVideogames } from '../../redux/actions';


const Filter = () => {

  const dispatch = useDispatch()

  let genres = useSelector(state=>state.genres)
  let [filters, setFilters] = React.useState({})

  let videogames = useSelector(state=>state.videogames)
 
  const filterGenre = [...genres.map(genre=>genre.name)]
  //console.log(filterGenre)


  const handleFilterGenre=(e)=>{
    setFilters(prev=>{
     return {
      ...prev,
      genre:e.target.value
     }
    })

    window.scrollTo({
      top: 100, 
      behavior: 'smooth'
    });
  }

  const handleFilterOrigin=(e)=>{
    setFilters(prev=>{
      return {
       ...prev,
       origin:e.target.value
      }
     })
  }

  const applyFilter=()=>{
    let filterVideogame = [...videogames]
    //console.log(action.payload)
    if(filters.genre){
      filterVideogame = filterVideogame.filter(v=>{
        let videogameGenre = v.genres.map(g=>g.name)
        return videogameGenre.includes(filters.genre)
      })
    }
    if(filters.origin){
      filterVideogame = filterVideogame.filter(v=>{
        if(filters.origin === "api"){
          return v.id < 1000000
        }else return v.id >= 1000000
      })
    }
    dispatch(filterByGenre(filterVideogame))
  }

  useEffect(()=>{
    
      applyFilter()
    
  },[filters,videogames])

  const showAll=()=>{
    setFilters({})
    dispatch(resetFilter())
    if(videogames.length < 20){
      dispatch(getAllVideogames())
    }

    window.scrollTo({
      top: 100, 
      behavior: 'smooth'
    });
  }

  

  return (
    <div>
      <div className="select filter_genre">
          <select
            onChange={(e)=>handleFilterGenre(e)}
            aria-label="Filter Videogames By Genre">
            <option value="" disabled selected>Filter By Genre</option>
            <option value="">All Genres</option>
            {filterGenre && filterGenre.map((item) => (
            <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <span className="focus"></span>
      </div>
      <div className='select filter_origin'>
        <select  onChange={(e)=>handleFilterOrigin(e)}>
          <option value="" disabled selected>Filter by Source</option>
          <option value="">All Sources</option>
          <option value='api'>From API</option>
          <option value='added'>Added</option>
        </select>
      </div>
      <button onClick={showAll} className="show_all-btn">Show All</button>
    </div>
  )
}

export default Filter