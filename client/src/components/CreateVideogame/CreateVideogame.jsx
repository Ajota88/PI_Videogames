import React from 'react'
import axios from 'axios'
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { getGenres,getAllVideogames} from '../../redux/actions'
import { useForm } from '../../hooks/useForm'
import "./style.scss"
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';


const CreateVideogame = () => {

  const platformsList = ["Xbox","Playstation", "Nintendo","PC","Linux","Android","MacOs"]
  const dispatch = useDispatch()
  const genres = useSelector(state=>state.genres)
  let [formSubmited,setFormSubmited] = React.useState(false)
  const [platformsChecked, setPlatformsChecked] = React.useState(new Array(platformsList.length).fill(false))
  const [genresChecked, setGenresChecked] = React.useState(new Array(19).fill(false))
  let [formError,setFormError] = React.useState(true)
 //console.log(genres)

  useEffect(()=>{

    dispatch(getGenres())

  },[])



  const initialForm= {
    name:"",
    description:"",
    rating: 0,
    releaseDate:""
 }

 /*/////////Validacion Formulario////////////////////////////////// */

 const validationsForm = (form) => {
    let errors = {}
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{3,20}$/;

    let regexComments = /^.{15,300}$/;

    if(!form.name.trim()){
      errors.name = "'Name' is required"
    }else if(!regexName.test(form.name.trim())){
      errors.name = "'Name' must contain only letters and a minimun of 3 and a maximun of 20 characters"
    }

    if(!form.description.trim()){
      errors.description = "'Description' is required"
    }else if(!regexComments.test(form.description.trim())){
      errors.description = "'Description' must be a minimum of 15 and maximun of 255 characters"
    }

    if(form.rating>5 || form.rating<0){
      errors.rating = "Input must be between 0.1 and 5.0"
    }else if(!form.rating){
      errors.rating = "'Rating' can't be empty or 0"
    }else if(form.rating.toString().includes(".") && form.rating.toString().split(".")[1].length > 2){
      errors.rating = "'Rating' can't contain more than 2 decimals"
    }

    let currentDate = Date.now()
    let limitDate = new Date(1958, 10, 1)
    let limitDateMil = limitDate.getTime()
    let dateInput = new Date(form.releaseDate)
    let dateInputMil = dateInput.getTime()
    
    if(form.releaseDate===""){
      errors.releaseDate= "Date is required"
    }else if(form.releaseDate){
      if(dateInputMil>currentDate){
        errors.releaseDate = "Invalid Date, Date cannot be greater than current Date"
      }else if(dateInputMil<limitDateMil){
        errors.releaseDate= "Invalid Date, Date cannot be earlier than 1958"
      }
    }
    return errors
  }
  /*//////////////////////////////////////////////////////////////////////// */

const {form,
  errors,
  handleChange,
  handleBlur,
  } = useForm(initialForm,validationsForm)

  //Habilitacion boton Add
 

  
    let disabled = Object.values(form).some(el=>!el)  
    
  
  

////////////*Control checkboxes///////////// */
 

  function handlePlatChange(position){

    setPlatformsChecked(prev=>prev.map((item, index) =>
    index === position ? !item : item 
    ))
  }
 
  function handleGenreChange(position){

    setGenresChecked(prev=>prev.map((item, index) =>
    index === position ? !item : item 
    ))

  }
/*///////////////////////////////////////////////////////////*/ 

  
  
  //Eviando la informacion del formulario
  function handleSubmit(e){

    let platforms =[]
    for(let i=0; i< platformsChecked.length; i++){
      
      if(platformsChecked[i]) platforms.push(platformsList[i])
    }

    let genresForm = []

    for(let i=0; i< genres.length; i++){
      
      if(genresChecked[i]) genresForm.push(genres[i])
    }

    let onePlatChecked = platformsChecked.some(el=>el===true)
    let oneGenreChecked = genresChecked.some(el=>el===true)
   
    e.preventDefault()

    if(Object.keys(errors).length>0 || onePlatChecked === false || oneGenreChecked===false) return

    axios.post("http://localhost:3001/videogames",{
      name:form.name,
      description: form.description,
      rating: Number(form.rating).toFixed(2),
      platforms: platforms,
      genres:genresForm,
      release_date:form.releaseDate
    })
    .then(res=>setFormSubmited(true))
    .then(res=>dispatch(getAllVideogames()))
    .catch(e=>console.log(e))
  }
/********************************************************************************* */
  return (
    <div>
      <h1>Add Videogame</h1>
      <div className='search-bar'><SearchBar className="searchbar" /></div>
    
     {!formSubmited && <form onSubmit={(e)=>handleSubmit(e)} className="form-container">
        <div className='name-container'>
          <label>(*)Name: </label>
          <input type="text" name={"name"}   onBlur={handleBlur}
        value={form.name} onChange={handleChange} className="name-input" />
        {errors && <p>{errors.name}</p>}
        </div>
      
        <div className='rating-container'>
          <label>(*)Rating: </label>
          <input type="number" name={"rating"} value={form.rating} onChange={handleChange} onBlur={handleBlur} className="rating-input" />
          {errors && <p>{errors.rating}</p>}
        </div>
      
        <div className='date-container'>
          <label>(*)Release Date: </label>
          <input type="date" name={"releaseDate"} value={form.releaseDate} onChange={handleChange} onBlur={handleBlur} className="input-date"/>
          {errors && <p>{errors.releaseDate}</p>}
        </div>
        <div className='description-container'>
          <label>(*)Description: </label>
          <textarea placeholder='Description...' type="text" name={"description"}   onBlur={handleBlur}
        value={form.description} onChange={handleChange} className="description-input" />
          {errors && <p>{errors.description}</p>}
        </div>
      
        <div className='paltforms-container'>
        <fieldset className='platforms-form'>
          <legend>(*)Platforms</legend>                    { /* Platforms checkboxes */}
          <ul>
          {platformsList.map((p,index)=>{
              return(
                <div key={index}>
                  <li>
                    <input type="checkbox"
                    name={p} value={p}
                    checked={platformsChecked[index]}
                    id={`custom-checkbox-${index}`}
                    onChange={() => handlePlatChange(index)}
                   />
                  </li>
                  <label htmlFor={`custom-checkbox-${index}`}>{p}</label>
                </div>  
              )
          })}
          </ul>
        </fieldset>
        </div>
       
        <div className='genres-container'>
        <fieldset className='genres-form'>                        
          <legend>(*)Genres</legend>                 { /* Genres checkboxes */}
          <ul>
          {genres.map((g,index)=>{
              return(
                <div key={index}>
                  <li>
                    <input type="checkbox"
                    name={g.name} value={g.name}
                    checked={genresChecked[index]}
                    id={`genre-custom-checkbox-${index}`}
                    onChange={() => handleGenreChange(index)}
                   />
                  </li>
                  <label htmlFor={`genre-custom-checkbox-${index}`}>{g.name}</label>
                </div>
              )
          })}
          </ul>
        </fieldset>

        </div>
        <button type="submit" className='create-btn' disabled={disabled }>Add Videogame</button>
        <br />
          <p className='requirements'>(*): Fields required</p>
      </form>}
      {formSubmited && <h2 className='form-submited'>Form Submited!</h2>}
      <Link to="/HOME">
         <button  className='home-btn'>HOME</button>
      </Link>
    </div>
  )
}

export default CreateVideogame