const curso = require('../models/curso');
const persona = require('../models/persona');
const evaluacion = require('../models/evaluacion');

function getCursos(req, res) {
    curso.findAll({
        where: {
            activo: 'true'
        },
        include: [{
            model: persona,
            as: 'profesor'
        }
        ]
    }).then(
        resultado => {
            res.status(200).send({
                result: resultado
            });
        }
    ).catch(exception => {
        res.status(500).send({
            error: exception
        })
    })
}

function crearCurso(req, res) {
    curso.create({
        nombre_curso: req.body.nombre_curso,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        activo: true,
        id_profesor: req.body.id_profesor
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

function editarCurso(req, res) {
    curso.findOne({
        where: {
            id_curso: req.body.id_curso
        }
    }).then(resultado => {

        if (resultado != null) {
            resultado.update({
                nombre_curso: req.body.nombre_curso,
                fecha_inicio: req.body.fecha_inicio,
                fecha_fin: req.body.fecha_fin,
                activo: true,
                id_profesor: req.body.id_profesor
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

function eliminarCurso(req, res) {
    curso.findOne({
        where: {
            id_curso: req.body.id_curso
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
    getCursos,
    crearCurso,
    editarCurso,
    eliminarCurso
}