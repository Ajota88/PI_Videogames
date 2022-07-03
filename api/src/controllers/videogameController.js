//Traer el videojuego que corresponda con el id

require('dotenv').config();
const {API_KEY } = process.env

const { Videogame, Genre,Videogame_Genre, Op } = require("../db")

const axios = require("axios");


async function getVideogameById (req,res,next){

  let {id: idQuery} = req.params

  console.log(req.params.id)
  

  try {

    let videogameById = await Videogame.findOne({
      where: {
        id: idQuery,
      },
      include: {
        model: Genre,
      },
    });

    if(videogameById){
      let vidDataFront ={
        id: videogameById.id,
        name : videogameById.name,
        description: videogameById.description,
        image: videogameById.background_image ? videogameById.background_image : null,
        releaseDate: videogameById.release_date,
        rating: videogameById.rating,
        platforms: videogameById.platforms,
        genres: videogameById.genres.map(gen=>{
                    return {
                      name: gen.name,
                      id: gen.id
                    }            
        })
      }
      return res.send(vidDataFront)

    }

    if(videogameById === null){
     videogameById = (await axios(`https://api.rawg.io/api/games/${idQuery}?&key=${API_KEY}`)).data

    let vidDataFront = {
      id : videogameById.id,
      name: videogameById.name,
      image: videogameById.background_image ? videogameById.background_image : null,
      description: videogameById.description,
      releaseDate: videogameById.released,
      rating: videogameById.rating,
      platforms: videogameById.platforms.map(elem=>elem.platform.name),
      genres: videogameById.genres.map(gen=>gen.name)
    }

    return res.send(vidDataFront)
  }else throw new Error("No se encontro el videojuego")

  } catch (error) {
    
    return res.status(404).send("No se encontro el videojuego")

  }
  
}

module.exports={
  getVideogameById
}