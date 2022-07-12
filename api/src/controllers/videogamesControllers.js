require('dotenv').config();
const { Videogame, Genre,Videogame_Genre, Op,conn } = require("../db")
const {API_KEY } = process.env

const axios = require("axios");

async function getVideogames (req,res,next){


  let {name: nameQuery} = req.query
  //console.log(nameQuery)

  try {

    //Buscando por nombre

    if(nameQuery){
      let videogamesApi = (await axios(`https://api.rawg.io/api/games?search=${nameQuery}&key=${API_KEY}`)).data.results

      let videogamesApiDataFront= videogamesApi.map(elem=>{
        return {

          id: elem.id,
          name: elem.name,
          image: elem.background_image ? elem.background_image : null,
          genres: elem.genres && elem.genres.map(g => {
            return {
                id: g.id,
                name: g.name,
            };
            }),
          rating:elem.rating

        }
      })

      //Buscando por nombre en la DB

      let videogamesDB   = await Videogame.findAll({
        include:{
          model:Genre
        },
        where:{
          name:{
            [Op.like]: `%${nameQuery}%`
          }
        }
      })


      let videogamesDBDataFront = videogamesDB.map(elem=>{
        return {

          id: elem.id,
          name: elem.name,
          image: elem.background_image ? elem.background_image : null,
          genres: elem.genres && elem.genres.map(g => {
            return {
                id: g.id,
                name: g.name,
            };
            }),

          rating: elem.rating

        }
      })

      let allVideogames = [...videogamesApiDataFront, ...videogamesDBDataFront ].slice(0,15)
      if(allVideogames.length ===0){
        throw new Error("No se encontraron videojuegos con ese nombre")
      }

      return  res.send(allVideogames)

    }

    //Trayendome los primeros 100 resultados

    let page = 1
    let videogamesApi = []
    while(videogamesApi.length<100){
    let data = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`)).data.results
      videogamesApi = [...videogamesApi,...data]
      page +=1
    }

    let videogamesApiDataFront= videogamesApi.map(elem=>{
      return {

        id: elem.id,
        name: elem.name,
        image: elem.background_image ? elem.background_image : null,
        genres: elem.genres && elem.genres.map(g => {
          return {
              id: g.id,
              name: g.name,
          };
          }),

        rating: elem.rating

      }
    })

    let videogamesDB   = await Videogame.findAll({
      include:{
        model:Genre
      }
    })

    let videogamesDBDataFront = videogamesDB.map(elem=>{
      return {

        id: elem.id,
        name: elem.name,
        image: elem.background_image ? elem.background_image : null,
        genres: elem.genres && elem.genres.map(g => {
          return {
              id: g.id,
              name: g.name,
          };
          }),

        rating: elem.rating

      }
    })


    let allVideogames = [...videogamesApiDataFront, ...videogamesDBDataFront ]

    res.send(allVideogames)

  } catch (error) {
     next(error)
  }


}

async function createVideogame (req,res,next){

  const {name,description,release_date,rating,platforms,genres} = req.body

  let genresId= genres.map(gen=>gen.id)


  let [results, metadata] = await conn.query("SELECT id FROM videogames ORDER BY id DESC LIMIT 1")
  
  let nuevoId= results.length===0?1000000:results[0].id +1
  
  

  if(!name || !description || !platforms){
    return res.status(404).send("Faltan enviar datos obligatorios")
  }

  let videogame={
      id:nuevoId,
      name,
      description,
      release_date,
      rating,
      platforms
  }
  try {

    let newVideogame = await Videogame.create(videogame)

    //Traemos los generos de la DB y se crea la relacion entre los 2 modelos

    const genresFromDB = await Genre.findAll({   
      where: {
        id: {
          [Op.in]: genresId,
        },
      },
    });
    
    let arrPromises = genresFromDB.map(gen=>newVideogame.setGenres(gen))
    await Promise.all(arrPromises)

    res.status(201).send(newVideogame)

  } catch (error) {
    next(error)
  }
}

module.exports={
  getVideogames,
  createVideogame
}