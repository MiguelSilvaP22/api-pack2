const curso = require('../models/curso');
const persona = require('../models/persona');
const nota = require('../models/nota');

function getCursos(req, res) {}

function crearNota(req, res) {
    nota.create({
        puntaje: req.body.puntaje,
        id_evaluacion: req.body.id_evaluacion,
        id_alumno: req.body.id_alumno,
        activo: true,
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

function editarNota(req, res) {
    nota.findOne({
        where: {
            id_nota: req.body.id_nota
        }
    }).then(resultado => {

        if (resultado != null) {
            resultado.update({
                puntaje: req.body.puntaje,
                id_evaluacion: req.body.id_evaluacion,
                id_alumno: req.body.id_alumno,
                activo: true,
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
    getCursos,
    crearNota,
    editarNota,
    eliminarNota
}