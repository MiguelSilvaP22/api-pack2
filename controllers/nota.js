const curso = require('../models/curso');
const persona = require('../models/persona');
const nota = require('../models/nota');
const db = require('../config/connection');

function getNotasEvaluacion(req, res) {

    const query =
        "  select persona.*,  " +
        " 	(select nota.puntaje from nota where nota.id_alumno = persona.id_persona and nota.id_evaluacion = :id_evaluacion and nota.activo is true limit 1)" +
        "  from persona " +
        "  inner join alumno_curso on (alumno_curso.id_alumno = persona.id_persona) " +
        "  where alumno_curso.id_curso = :id_curso " +
        "  and alumno_curso.activo is true " +
        "  and persona.activo is true ";

    db.query(
        query, {
        replacements: {
            id_curso: req.params.id_curso,
            id_evaluacion: req.params.id_evaluacion,
        },
        type: db.QueryTypes.SELECT
    }
    ).then(resultado => {
        res.status(200).send({
            result: resultado
        });
    }).catch(exception => {
        console.log(exception)
        res.status(500).send({
            error: exception
        })
    })
}

function crearNota(req, res) {

    console.log(req.body);
    nota.findOne({
        where: {
            id_alumno: req.body.id_alumno,
            id_evaluacion: req.body.id_evaluacion
        }
    }).then(resultado => {

        if (resultado != null) {
            resultado.update({
                activo: false
            }).then(resultUpdate => {

                nota.create({
                    puntaje: req.body.puntaje,
                    id_evaluacion: req.body.id_evaluacion,
                    id_alumno: req.body.id_alumno,
                    activo: true,
                }).then(resultadoCrear => {
                    res.status(200).send({
                        result: resultadoCrear
                    });
                }).catch(exception => {
                    res.status(500).send({
                        error: exception
                    })
                })

            })
        } else {
            nota.create({
                puntaje: req.body.puntaje,
                id_evaluacion: req.body.id_evaluacion,
                id_alumno: req.body.id_alumno,
                activo: true,
            }).then(resultadoCrear => {
                res.status(200).send({
                    result: resultadoCrear
                });
            }).catch(exception => {
                res.status(500).send({
                    error: exception
                })
            })
        }

    }).catch(exception => {
        res.status(500).send({
            error: exception
        })
    })


}

function editarNota(req, res) {

}

function eliminarNota(req, res) {
    nota.findOne({
        where: {
            id_nota: req.body.id_nota
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
    getNotasEvaluacion,
    crearNota,
    editarNota,
    eliminarNota
}