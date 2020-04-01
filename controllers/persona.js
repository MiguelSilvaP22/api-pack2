const persona = require('../models/persona');

function getPersonas(req, res) {
    persona.findAll().then(
        resultado => {
            res.status(200).send({result: resultado});
        }
    )
}

function crearPersona(req, res) {
    persona.create( {
        rut: req.body.rut, 
        nombres: req.body.nombres, 
        apellido_mat:req.body.apellido_mat,
        apellido_pat: req.body.apellido_pat,
        activo: true,
        id_rol: req.body.id_rol
    }).then( resultado => {
        res.status(200).send({result: resultado});
    })

}

function editarPersona(req, res) {
    persona.findOne({where: {id_persona: req.body.id_persona}
    }).then( resultado => {
        
        if(resultado != null) {
            resultado.update({
                rut: req.body.rut, 
                nombres: req.body.nombres, 
                apellido_mat:req.body.apellido_mat,
                apellido_pat: req.body.apellido_pat,
                activo: true,
                id_rol: req.body.id_rol
            }).then ( resultUpdate => {
                res.status(200).send({result: resultUpdate});

            })
        } else {
        res.status(500).send({result: null});
        }

    })
}

function eliminarPersona(req, res) {
    persona.findOne({where: {id_persona: req.body.id_persona}
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
    getPersonas,
    crearPersona,
    editarPersona,
    eliminarPersona
}