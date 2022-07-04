import React from 'react'

const CreateVideogame = () => {

  const [input, setInput] = React.useState({
                                              name:"",
                                              description:"",
                                              rating: 0,
                                              platforms:[],
                                              genres:[],
                                              releaseDate:""
                                           })


  function handleChange(e){
  setInput({...input, [e.target.name] : e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault()
    
  }

  return (
    <div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input type="text" name={"name"} value={input.name} onChange={handleChange} />
        </div>
       
        <div>
          <label>Description: </label>
          <input type="text" name={"description"} value={input.description} onChange={handleChange} />
        </div>

        <div>
          <label>Rating: </label>
          <input type="text" name={"rating"} value={input.rating} onChange={handleChange} />
        </div>

        <button type="submit">Create Videogame</button>

      </form>
    </div>
  )
}

export default CreateVideogame