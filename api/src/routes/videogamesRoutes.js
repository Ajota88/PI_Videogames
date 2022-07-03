const { Router } = require('express');
const { getVideogames,createVideogame } = require('../controllers/videogamesControllers');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/",getVideogames)
router.post("/",createVideogame)

module.exports = router;
