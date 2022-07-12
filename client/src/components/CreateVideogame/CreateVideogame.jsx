import React from 'react'
import axios from 'axios'
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { getGenres } from '../../redux/actions'
import { useForm } from '../../hooks/useForm'
import "./style.scss"
import { Link } from 'react-router-dom'


const CreateVideogame = () => {

  const platformsList = ["Xbox","Playstation", "Nintendo","PC","Linux","Android","MacOs"]
  const dispatch = useDispatch()
  const genres = useSelector(state=>state.genres)
  let [formSubmited,setFormSubmited] = React.useState(false)
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

 const validationsForm = (form) => {
  let errors = {}
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  
  let regexComments = /^.{1,255}$/;

  if(!form.name.trim()){
    errors.name = "El campo 'name' es requerido"
  }else if(!regexName.test(form.name.trim())){
    errors.name = "El campo 'nombre' solo acepta letras"
  }

  if(!form.description.trim()){
    errors.description = "El campo 'description' es requerido"
  }else if(!regexComments.test(form.description.trim())){
    errors.description = "El campo 'comments' no puede ser mayor a 250 caracteres "
  }

  if(form.rating>5 || form.rating<0){
    errors.rating = "El rating debe de estar entre 0 y 5"
  }

  if(form.releaseDate===""){
    errors.releaseDate= "fecha nulla"
  }else {
    let fecha = new Date(form.releaseDate)
    console.log(fecha.getTime())
    if(fecha.getTime()<birthday.getTime()) errors.releaseDate="la fecha no puede ser anterior a "
  }

  return errors
}

const {form,
  errors,
  handleChange,
  handleBlur,
  fecha} = useForm(initialForm,validationsForm)


  const [platformsChecked, setPlatformsChecked] = React.useState(new Array(platformsList.length).fill(false))

  const [genresChecked, setGenresChecked] = React.useState(new Array(19).fill(false))

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

    e.preventDefault()

    if(Object.keys(errors).length && onePlatChecked === false) return

    axios.post("http://localhost:3001/videogames",{
      name:form.name,
      description: form.description,
      rating: form.rating,
      platforms: platforms,
      genres:genresForm,
      release_date:form.releaseDate
    })
    .then(res=>setFormSubmited(true))
  }

  return (
    <div>
      <h1>Add Videogame</h1>
     {!formSubmited && <form onSubmit={(e)=>handleSubmit(e)} className="form-container">
        <div>
          <label>Name: </label>
          <input type="text" name={"name"}   onBlur={handleBlur}
        value={form.name} onChange={handleChange} />
        </div>
        {errors && <p>{errors.name}</p>}
        <div>
          <label>Rating: </label>
          <input type="number" name={"rating"} value={form.rating} onChange={handleChange} onBlur={handleBlur} />
        </div>
        {errors && <p>{errors.rating}</p>}
        <div>
          <label>Release Date: </label>
          <input type="date" name={"releaseDate"} value={form.releaseDate} onChange={handleChange} />
        </div>
        {errors && <p>{errors.releaseDate}</p>}
        <div>
          <label>Description: </label>
          <textarea placeholder='Description' type="text" name={"description"}   onBlur={handleBlur}
        value={form.description} onChange={handleChange} />
        </div>
        {errors && <p>{errors.description}</p>}
        <div>
        <fieldset className='platforms-form'>
          <legend>Platforms</legend>                    { /* Platforms checkboxes */}
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
        <div>
        <fieldset className='genres-form'>                        
          <legend>Genres</legend>                 { /* Genres checkboxes */}
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
        <button type="submit" className='create-btn' disabled={!Boolean(form.name)}>Add Videogame</button>
        <br />
       
      </form>}
      {formSubmited && <h2 className='form-submited'>Form Submited!</h2>}
      <Link to="/HOME">
         <button  className='home-btn'>BACK HOME</button>
      </Link>
    </div>
  )
}

export default CreateVideogame