const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/connection');
const rutas = require('./routes/index')

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


// COnfiguracion basica para la API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
    next();
});


db.authenticate()
    .then(() => {
        // Generador Inicial de la Base de datos
            const init = require('./config/ini');
    })
    .catch(err => console.log('Error: ' + err));



//Define routes
app.use('',rutas.ruta_persona)
app.use('',rutas.ruta_nota)
app.use('',rutas.ruta_evaluacion)
app.use('',rutas.ruta_curso)
app.use('',rutas.ruta_alumno_curso)

module.exports = app;