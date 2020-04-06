var express = require('express');
var router = express.Router();
const evaluacionController = require ('../controllers/evaluacion');

router.post('/evaluacion', evaluacionController.crearEvaluacion);
router.put('/evaluacion', evaluacionController.editarEvaluacion);
router.delete('/evaluacion', evaluacionController.eliminarEvaluacion);
router.get('/evaluacion', evaluacionController.getEvaluaciones);


module.exports = router;

