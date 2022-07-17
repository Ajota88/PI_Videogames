import React from 'react'
import "./style.scss"
import { reloadDB,getAllVideogames } from '../../redux/actions'
import { useDispatch } from 'react-redux'


const SearchFailed = () => {
  const dispatch = useDispatch()

  const dbReload=()=>{
    dispatch(reloadDB())
    dispatch(getAllVideogames())
  }

  return (
    <div className='search-failed'>
      <h2>No game found that matches your search term</h2>
      <button onClick={dbReload} className='reload-btn'>Reload Database</button>
    </div>
  )
}

export default SearchFailed