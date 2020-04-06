const Rol = require('../models/rol');
const Persona = require('../models/persona');
const Curso = require('../models/curso');
const alumno_curso = require('../models/alumno_curso');
const nota = require('../models/nota');
const evaluacion = require('../models/evaluacion');
const db = require('../config/connection');


Rol.sync();
Persona.sync()
Curso.sync()
alumno_curso.sync()
nota.sync()
evaluacion.sync()


const query1 = "INSERT INTO public.rol VALUES(1, 'Profesor', true, '10/10/10', '10/10/10') on conflict do nothing";
const query2 = "INSERT INTO public.rol VALUES(2, 'Alumno', true, '10/10/10', '10/10/10') on conflict do nothing";

db.query(
    query1, {

    type: db.QueryTypes.SELECT
}
).then(resultado => {
}).catch(exception => {

})


db.query(
    query2, {
    type: db.QueryTypes.SELECT
}
).then(resultado => {

}).catch(exception => {

})


console.log('Iniciando')