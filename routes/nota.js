var express = require('express');
var router = express.Router();
const notaController = require ('../controllers/nota');

router.post('/nota', notaController.crearNota);
router.put('/nota', notaController.editarNota);
router.delete('/nota', notaController.eliminarNota);
// router.get('/evaluacion', cursoController.getCursos);


module.exports = router;

