const express = require('express');
const router = express.Router();
const ruta_persona = require('./persona');
const ruta_curso = require('./curso');
const ruta_alumno_curso = require('./alumno_curso');
const ruta_evaluacion = require('./evaluacion');
const ruta_nota = require('./nota');


/* GET home page. */
router.get('/', (req, res) => res.send('API PACK 2 v0.1'));




// retorna rutas generales 
module.exports = {router, 
    ruta_persona,
    ruta_curso,
    ruta_alumno_curso,
    ruta_evaluacion,
    ruta_nota};
