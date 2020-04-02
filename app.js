const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/connection');
const Persona = require('./models/persona');
const Rol = require('./models/rol');
const Curso = require('./models/curso');
const alumno_curso = require('./models/alumno_curso');
const evaluacion = require('./models/evaluacion');
const nota = require('./models/nota');


// let api = require('./routes/routes_leq');
// let apiRaiz = require('./routes/raiz');
// var utilidades = require('./utils/utils')


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
    next();
});


db.authenticate()
    .then(() => {
        // Rol.sync();
        // Persona.sync()
        // Curso.sync()
        // alumno_curso.sync()
        // nota.sync()
        console.log('CONECTADO')
    })
    .catch(err => console.log('Error: ' + err));



//Define routes
app.use('', require('./routes/index'));
app.use('', require('./routes/persona'));
app.use('', require('./routes/curso'));
app.use('', require('./routes/alumno_curso'));
app.use('', require('./routes/evaluacion'));
app.use('', require('./routes/nota'));


// app.use(utilidades.reemplazaComilla)
// app.use('/', apiRaiz);
// app.use('/leq', api);
// app.use(errorHandler);



// function errorHandler(err, req, res, next) {
//     var resultado = {
//         ok: false,
//         error: err.stack,
//         respuesta: null
//     };
//     res.send(resultado);
// }

module.exports = app;