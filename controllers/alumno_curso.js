const curso = require('../models/curso');
const persona = require('../models/persona');
const alumno_curso = require('../models/alumno_curso');

function getAlumnos_de_curso(req, res) {
    curso.findAll( {where: {activo: 'true', id_curso: 1}, 
                include:[{model: alumno_curso} ] } ).then(
        resultado => {
            res.status(200).send({result: resultado});
        }
    )
}

function crearAlumno_curso(req, res) {
    curso.create( {
        nombre_curso: req.body.nombre_curso, 
        fecha_inicio: req.body.fecha_inicio, 
        fecha_fin: req.body.fecha_fin,
        activo: true,
        id_profesor: req.body.id_profesor
    }).then( resultado => {
        res.status(200).send({result: resultado});
    })

}

function editarAlumno_curso(req, res) {
    curso.findOne({where: {id_curso: req.body.id_curso}
    }).then( resultado => {
        
        if(resultado != null) {
            resultado.update({
                nombre_curso: req.body.nombre_curso, 
                fecha_inicio: req.body.fecha_inicio, 
                fecha_fin: req.body.fecha_fin,
                activo: true,
                id_profesor: req.body.id_profesor
            }).then ( resultUpdate => {
                res.status(200).send({result: resultUpdate});
            })
        } else {
        res.status(500).send({result: null});
        }

    })
}

function eliminarAlumno_curso(req, res) {
    curso.findOne({where: {id_curso: req.body.id_curso}
    }).then( resultado => {
        if(resultado != null) {
            resultado.update({
                activo: false
            }).then ( resultUpdate => {
                res.status(200).send({result: resultUpdate});
            })
        } else {
        res.status(500).send({result: null});
        }

    })
}

module.exports = {
    getAlumnos_de_curso,
    crearAlumno_curso,
    editarAlumno_curso,
    eliminarAlumno_curso
}