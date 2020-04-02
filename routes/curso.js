var express = require('express');
var router = express.Router();
const cursoController = require ('../controllers/curso');

router.get('/curso', cursoController.getCursos);
router.post('/curso', cursoController.crearCurso);
router.put('/curso', cursoController.editarCurso);
router.delete('/curso', cursoController.eliminarCurso);

module.exports = router;

