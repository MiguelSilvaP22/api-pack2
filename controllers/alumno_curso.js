const curso = require('../models/curso');
const alumno_curso = require('../models/alumno_curso');
const db = require('../config/connection');


function getAlumnos_de_curso(req, res) {
    const query =
    "SELECT   " +
    "curso.*, " + 
    "       (select json_agg(aux.*) from( " + 
    "           select persona.*, " + 
" " + 
    "               (select  " + 
    "                   (CASE WHEN count(alumno_curso.*) > 0 THEN true  " + 
    "                           ELSE false END )as pertenese_curso " + 
    "               from alumno_curso  " + 
    "               where alumno_curso.id_alumno = persona.id_persona  " + 
    "               and alumno_curso.activo is true " + 
    "							and alumno_curso.id_curso = curso.id_curso    " + 
    "               ) " + 
" " + 
    "           from persona " + 
    "               where persona.activo is true " + 
    "        ) as aux)	as alumnos	 " + 
    "FROM   " + 
    "    curso    " +
    " WHERE curso.id_curso = :id_curso"

        console.log(query);

    db.query(
        query, {
            replacements: {
                id_curso: req.params.id_curso
            },
            type: db.QueryTypes.SELECT
        }
    ).then(resultado => {
        res.status(200).send({
            result: resultado[0]
        });
    }).catch(exception => {
        res.status(500).send({
            error: exception
        })
    })
}


function getCursos_de_alumno(req, res) {
    const query =
        " SELECT     " +
        "     persona.*,     " +
        "     COALESCE ((    " +
        "         SELECT     " +
        "             json_agg ( curso.* )   " +
        "         FROM   " +
        "             alumno_curso   " +
        "             INNER JOIN curso ON ( curso.id_curso = alumno_curso.id_curso )     " +
        "         WHERE  " +
        "             alumno_curso.id_curso = curso.id_curso     " +
        "             AND curso.activo IS TRUE   " +
        "             AND alumno_curso.activo IS TRUE    " +
        "                 ),     " +
        "             '[]'   " +
        "         ) AS cursos    " +
        " FROM   " +
        "     persona    " +
        " WHERE  " +
        "     persona.id_persona = :id_persona    " +
        "     AND persona.activo IS TRUE     ";

    db.query(
        query, {
            replacements: {
                id_persona: req.params.id_persona
            },
            type: db.QueryTypes.SELECT
        }
    ).then(resultado => {
        res.status(200).send({
            result: resultado
        });
    }).catch(exception => {
        res.status(500).send({
            error: exception
        })
    })
}

function crearAlumno_curso(req, res) {
    console.log(req.body)
    alumno_curso.create({
        id_curso: req.body.id_curso,
        id_alumno: req.body.id_alumno,
        activo: true
    }).then(resultado => {
        res.status(200).send({
            result: resultado
        });
    }).catch(exception => {
        res.status(500).send({
            error: exception
        })
    })

}

function editarAlumno_curso(req, res) {

}

function eliminarAlumno_curso(req, res) {
    console.log(req.body)
    alumno_curso.findOne({
        where: {
            id_curso: req.body.id_curso,
            id_alumno: req.body.id_alumno,
        }
    }).then(resultado => {
        if (resultado != null) {
            resultado.update({
                activo: false
            }).then(resultUpdate => {
                res.status(200).send({
                    result: resultUpdate
                });
            })
        } else {
            res.status(500).send({
                result: null
            });
        }

    }).catch(exception => {
        res.status(500).send({
            error: exception
        })
    })
}

module.exports = {
    getAlumnos_de_curso,
    crearAlumno_curso,
    editarAlumno_curso,
    eliminarAlumno_curso,
    getCursos_de_alumno
}