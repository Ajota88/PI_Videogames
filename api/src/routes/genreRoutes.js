const { Router } = require('express');
const { getGenresFromDB } = require('../controllers/genreController');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/",getGenresFromDB)

module.exports = router;