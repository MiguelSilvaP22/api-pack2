var express = require('express');
var router = express.Router();
const personaController = require ('../controllers/persona');

router.get('/persona', personaController.getPersonas);
router.post('/persona', personaController.crearPersona);
router.put('/persona', personaController.editarPersona);
router.delete('/persona', personaController.eliminarPersona);

module.exports = router;
