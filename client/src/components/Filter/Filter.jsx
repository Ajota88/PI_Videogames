import React from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import "./Style.scss"
import { filterByGenre } from '../../redux/actions';

const Filter = () => {

  const dispatch = useDispatch()

  let genres = useSelector(state=>state.genres)

  const filterGenre = [...genres.map(genre=>genre.name)]
  //console.log(filterGenre)


  const handleFilter=(e)=>{
    dispatch(filterByGenre(e.target.value))
  }

  return (
    <div className="select filter_genre">
        <select
          onChange={(e)=>handleFilter(e)}
          aria-label="Filter Videogames By Genre">
          <option value="" disabled selected>Filter By Genre</option>
          {filterGenre && filterGenre.map((item) => (
          <option key={item} value={item}>Filter By {item}</option>
          ))}
        </select>
        <span className="focus"></span>
      </div>
  )
}

export default Filter