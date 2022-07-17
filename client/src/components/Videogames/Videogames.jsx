import React from 'react'
import { getAllVideogames,getGenres,resetFilter,showAdded } from '../../redux/actions'
import VideogameCard from "../VideogameCard/VideogameCard"
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import "./style.scss";
import {paginate} from '../../utils'
import { Link } from 'react-router-dom'
import Sort from '../Sort/Sort'
import Filter from '../Filter/Filter'
import Spinner from '../Spinner/Spinner'
import SearchFailed from '../SearchFailed/SearchFailed'
import SearchBar from '../SearchBar/SearchBar'



const Videogames = () => {

  const[loading,setLoading]=React.useState(true)
  const [page, setPage] = React.useState(0)
  
  const dispatch = useDispatch()
  let videogames = useSelector(state=>state.videogames)
  let dataFilter = useSelector(state=>state.dataFilter)
  let filterSelected = useSelector(state=>state.filterSelected)
  let searchFailed = useSelector(state=>state.searchFailed)
  //console.log(filterSelected)

  useEffect(()=>{
    
    dispatch(getAllVideogames())
    dispatch(getGenres())
    
    
  },[])


  if(videogames.length>0 && loading){
    setLoading(false)
   }

    /*/////////////////PAGINADO////////////////////////////// */
    
   let videogamesPaginate = filterSelected===false ? paginate(videogames) : paginate(dataFilter)

  const handlePage=index=>{
   setPage(index)
   window.scrollTo({
    top: 100, 
    behavior: 'smooth'
  });
   
 }
  const nextPage=()=>{
    setPage(oldPage=>oldPage+1)
    window.scrollTo({
      top: 100, 
      behavior: 'smooth'
    });
  }

  const prevPage=()=>{
    setPage(oldPage=>oldPage-1)
    window.scrollTo({
      top: 100, 
      behavior: 'smooth'
    });
  }

  useEffect(()=>{
    setPage(0)
    
  },[videogames])


/*/////////////////////////////////////////////////////////////////////////////////////*/
  


  return (
    <div>
      <div className='header-container'>
        <div className='header'>
          <h1>VIDEOGAME DB</h1>
        </div>
        {!searchFailed && <Sort />}
       {!searchFailed && <Filter />}
       <SearchBar />
        {!searchFailed && <Link to="/videogame/create">
         <button className='create_videogame'>Add Videogame</button>
        </Link>}
      </div>
      <div className='banner'></div>
     {loading?<Spinner />: !searchFailed &&<div className='videogame_list'>
        {videogamesPaginate[page] && videogamesPaginate[page].map(v=>(
          <VideogameCard
          key={v.id}
          id={v.id}
          name={v.name}
          rating={v.rating}
          image={v.image}
          genres={v.genres}
           />
        ))}
      </div>}

      {searchFailed && <SearchFailed />}
     

      {videogamesPaginate[page] && !searchFailed && <div className="btn-container">
        {page!==0 &&<button className='prev-btn' onClick={prevPage}>prev</button>}
        {videogamesPaginate.map((item,index)=>{
          return (
            <button onClick={()=>handlePage(index)} key={index} className={`page-btn ${index===page?'active-btn':""}`}>{index+1}</button>
          )
        })}
        {page <videogamesPaginate.length-1 &&<button className='next-btn' onClick={nextPage}>next</button>}
        </div>}
        {dataFilter.length===0 && filterSelected && <p className='no-added-found'>No Videogames found</p>}
    </div>
    
  )
}

export default Videogames