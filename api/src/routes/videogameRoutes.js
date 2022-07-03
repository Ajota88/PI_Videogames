const { Router } = require('express');
const { getVideogameById } = require('../controllers/videogameController');


const router = Router();


router.get("/:id",getVideogameById)


module.exports = router;