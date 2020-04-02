const curso = require('../models/curso');
const persona = require('../models/persona');
const evaluacion = require('../models/evaluacion');

function getCursos(req, res) {
}

function crearEvaluacion(req, res) {
    evaluacion.create({
        descripcion: req.body.descripcion,
        fecha_evaluacion: req.body.fecha_evaluacion,
        activo: true,
        id_curso: req.body.id_curso
    }).then(resultado => {
        res.status(200).send({
            result: resultado
        });
    })

}

function editarEvaluacion(req, res) {
    evaluacion.findOne({
        where: {
            id_evaluacion: req.body.id_evaluacion
        }
    }).then(resultado => {

        if (resultado != null) {
            resultado.update({
                descripcion: req.body.descripcion,
                fecha_evaluacion: req.body.fecha_evaluacion,
                activo: true,
                id_curso: req.body.id_curso
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

function eliminarEvaluacion(req, res) {
    evaluacion.findOne({
        where: {
            id_evaluacion: req.body.id_evaluacion
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
    getCursos,
    crearEvaluacion,
    editarEvaluacion,
    eliminarEvaluacion
}