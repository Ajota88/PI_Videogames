import React from 'react'
import { useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import "./Style.scss"
import { filterByGenre,resetFilter,getAllVideogames } from '../../redux/actions';

const Filter = () => {

  const dispatch = useDispatch()

  let genres = useSelector(state=>state.genres)
  let [filters, setFilters] = React.useState({})
 

  const filterGenre = [...genres.map(genre=>genre.name)]
  //console.log(filterGenre)


  const handleFilterGenre=(e)=>{
    setFilters(prev=>{
     return {
      ...prev,
      genre:e.target.value
     }
    })
  }

  const handleFilterOrigin=(e)=>{
    setFilters(prev=>{
      return {
       ...prev,
       origin:e.target.value
      }
     })
  }


  useEffect(()=>{
    dispatch(filterByGenre(filters))
  },[filters])

  const showAll=()=>{
    setFilters({})
    dispatch(resetFilter())
    dispatch(getAllVideogames())
  }



  return (
    <div>
      <div className="select filter_genre">
          <select
            onChange={(e)=>handleFilterGenre(e)}
            aria-label="Filter Videogames By Genre">
            <option value="" disabled selected>Filter By Genre</option>
            {filterGenre && filterGenre.map((item) => (
            <option key={item} value={item}>Filter By {item}</option>
            ))}
          </select>
          <span className="focus"></span>
      </div>
      <div className='select filter_origin'>
        <select  onChange={(e)=>handleFilterOrigin(e)}>
          <option value="" disabled selected>Select Origin</option>
          <option value='api'>From API</option>
          <option value='added'>Added</option>
        </select>
      </div>
      <button onClick={showAll} className="show_all-btn">Show All</button>
    </div>
  )
}

export default Filter