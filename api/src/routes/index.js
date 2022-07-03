const { Router } = require('express');
const videogamesRoutes = require("./videogamesRoutes")
const genreRoutes = require("./genreRoutes")
const videogameRoutes = require("./videogameRoutes")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames",videogamesRoutes)
router.use("/genres",genreRoutes)
router.use("/videogame",videogameRoutes)

module.exports = router;
