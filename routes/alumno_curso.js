var express = require('express');
var router = express.Router();
const alumno_cursoController = require ('../controllers/alumno_curso');

router.get('/alumnos_de_curso', alumno_cursoController.getAlumnos_de_curso);
// router.post('/alumno_curso', cursoController.crearCurso);
// router.put('/alumno_curso', cursoController.editarCurso);
// router.delete('/alumno_curso', cursoController.eliminarCurso);

module.exports = router;

