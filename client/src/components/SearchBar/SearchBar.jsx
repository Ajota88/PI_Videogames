import React from 'react'
import { getVideogamesByName } from '../../redux/actions'
import {useDispatch, useSelector} from "react-redux"
import "./style.scss"

const SearchBar = () => {
  const [input, setInput] = React.useState("")

  let searchFailed= useSelector(state=>state.searchFailed)

  const dispatch = useDispatch()

  function handleChange(e){
    setInput(e.target.value)
  }

  function handleSearch(){
    dispatch(getVideogamesByName(input.trim()))
    setInput("")
  }



  return (
    <div className='wrap'>
     { !searchFailed && <div className='search'>
      <input type="text" onChange={handleChange} value={input} className="serach-videogame" />
      <button onClick={handleSearch} className="search-btn">Search</button>
      </div>}
    </div>

   
  )
}

export default SearchBar