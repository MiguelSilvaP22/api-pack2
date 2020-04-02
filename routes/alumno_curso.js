var express = require('express');
var router = express.Router();
const alumno_cursoController = require ('../controllers/alumno_curso');

router.get('/alumnos_de_curso/:id_curso', alumno_cursoController.getAlumnos_de_curso);
router.get('/cursos_asignados/:id_persona', alumno_cursoController.getCursos_de_alumno);
router.post('/alumno_curso', alumno_cursoController.crearAlumno_curso);
// router.put('/alumno_curso', cursoController.editarCurso);
router.delete('/alumno_curso', alumno_cursoController.eliminarAlumno_curso);

module.exports = router;

