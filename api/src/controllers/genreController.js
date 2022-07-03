const axios = require("axios")
const {Genre} = require("../db")

require('dotenv').config();
const {API_KEY } = process.env


async function getAllGenres(){

  try {
    
    let genres = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results.
                  map(genre=>({id:genre.id, name:genre.name }))

    await Genre.bulkCreate(genres)

   console.log("Genres loaded to DB")

  } catch (error) {
    console.log(error)
  }
}

async function getGenresFromDB(req,res,next){
  try {
    
    let genres = await Genre.findAll({
      attributes: ['name', 'id']})
    res.send(genres)

  } catch (error) {
    next(error)
  }
}

module.exports={
  getAllGenres,
  getGenresFromDB
}