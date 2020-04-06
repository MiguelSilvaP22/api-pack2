var express = require('express');
var router = express.Router();
const personaController = require ('../controllers/persona');

router.get('/persona/:id_rol', personaController.getPersonas);
router.post('/persona', personaController.crearPersona);
router.put('/persona', personaController.editarPersona);
router.delete('/persona', personaController.eliminarPersona);
router.get('/detalle_alumno/:id_persona', personaController.getDetalleAlumno);

module.exports = router;
