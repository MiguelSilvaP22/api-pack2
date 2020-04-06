const curso = require('../models/curso');
const evaluacion = require('../models/evaluacion');

function getEvaluaciones(req, res) {
    evaluacion.findAll({
        where: {
            activo: 'true'
        },
        include: [{
            model: curso
        }
        ]
    }).then(
        resultado => {
            res.status(200).send({
                result: resultado
            });
        }
    ).catch(exception => {
        console.log(exception);

        res.status(500).send({
            error: exception
        })
    })
}

function crearEvaluacion(req, res) {
    
    console.log(req.body)
    evaluacion.create({
        descripcion: req.body.descripcion,
        fecha_evaluacion: req.body.fecha_evaluacion,
        activo: true,
        id_curso: req.body.id_curso
    }).then(resultado => {
        res.status(200).send({
            result: resultado
        });
    }).catch(exception => {
        console.log(exception);
        res.status(500).send({
            error: exception
        })
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

    }).catch(exception => {
        res.status(500).send({
            error: exception
        })
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

    }).catch(exception => {
        res.status(500).send({
            error: exception
        })
    })
}

module.exports = {
    getEvaluaciones,
    crearEvaluacion,
    editarEvaluacion,
    eliminarEvaluacion
}