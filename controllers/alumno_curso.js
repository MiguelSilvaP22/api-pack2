const curso = require('../models/curso');
const alumno_curso = require('../models/alumno_curso');
const db = require('../config/connection');


function getAlumnos_de_curso(req, res) {
    const query =        
        " SELECT " +
        "     curso.*, " +
        "     COALESCE (( " +
        "         SELECT " +
        "             json_agg ( persona.* )  " +
        "         FROM " +
        "             alumno_curso " +
        "             INNER JOIN persona ON ( persona.id_persona = alumno_curso.id_alumno )  " +
        "         WHERE " +
        "             alumno_curso.id_curso = curso.id_curso  " +
        "             AND persona.activo IS TRUE  " +
        "             AND alumno_curso.activo IS TRUE  " +
        "             ), " +
        "         '[]'  " +
        "     ) AS alumnos  " +
        " FROM " +
        "     curso  " +
        " WHERE " +
        "     id_curso = :id_curso ";

    db.query(
        query,
        {
            replacements: {
                id_curso: req.params.id_curso
            },
            type: db.QueryTypes.SELECT
        }
    ).then(resultado => {
        res.status(200).send({
            result: resultado
        });
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
        query,
        {
            replacements: {
                id_persona: req.params.id_persona
            },
            type: db.QueryTypes.SELECT
        }
    ).then(resultado => {
        res.status(200).send({
            result: resultado
        });
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
    })

}

function editarAlumno_curso(req, res) {

}

function eliminarAlumno_curso(req, res) {
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

    })
}

module.exports = {
    getAlumnos_de_curso,
    crearAlumno_curso,
    editarAlumno_curso,
    eliminarAlumno_curso,
    getCursos_de_alumno
}