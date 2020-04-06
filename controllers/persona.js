const persona = require('../models/persona');
const db = require('../config/connection');

function getPersonas(req, res) {
    console.log( req.params.id_perfil);
    persona.findAll({ where: { activo: true, id_rol: req.params.id_rol } }).then(
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

function getDetalleAlumno(req, res) {
    console.log(req.params)
    const query =
        " SELECT  " +
        " persona.*,  " +
        "   " +
        "     (select json_agg(cursos_aux.*) FROM (  " +
        "         SELECT    " +
        "             curso.*,  " +
        "       " +
        "             (select json_agg(evaluaciones_aux.*) FROM (  " +
        "               " +
        "                 select evaluacion.*,  " +
        "                   " +
        "                 (	select to_json(nota.*) from nota   " +
        "                     where nota.id_evaluacion =  evaluacion.id_evaluacion  " +
        "                     and nota.id_alumno = persona.id_persona  " +
        "                     and nota.activo is true  " +
        "                       limit 1" +
        "                     ) as nota  " +
        "                   " +
        "                 from evaluacion   " +
        "                 where evaluacion.id_curso = curso.id_curso  " +
        "                 and evaluacion.activo is true  " +
        "                 ) as evaluaciones_aux) as  evaluaciones  " +
        "               " +
        "         FROM alumno_curso  " +
        "         INNER JOIN curso ON ( curso.id_curso = alumno_curso.id_curso )   " +
        "         WHERE alumno_curso.id_alumno = persona.id_persona  AND alumno_curso.activo IS TRUE   " +
        "           " +
        "     ) AS cursos_aux ) as cursos  " +
        " FROM  " +
        "     persona  " +
        " WHERE persona.activo is true  " +
        " AND persona.id_persona = :id_persona " +
        " limit 1";

    db.query(
        query, {
        replacements: {
            id_persona: req.params.id_persona
        },
        type: db.QueryTypes.SELECT,
        raw: true
    }
    ).then(resultado => {
        if (resultado != null ) {
            res.status(200).send({
                result: resultado[0]
            });
        } else {
            res.status(200).send({
                result: null
            });
        }

    }).catch(exception => {
        console.log(exception)
        res.status(500).send({
            error: exception
        })
    })
}

function crearPersona(req, res) {
    console.log(req.body)
    persona.create({
        rut: req.body.rut,
        nombres: req.body.nombres,
        apellido_mat: req.body.apellido_mat,
        apellido_pat: req.body.apellido_pat,
        activo: true,
        // id = 1  --> profesor
        // id = 2  --> alumno
        id_rol: req.body.id_rol
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

function editarPersona(req, res) {

    console.log(req.body)
    persona.findOne({
        where: {
            id_persona: req.body.id_persona
        }
    }).then(resultado => {

        if (resultado != null) {
            resultado.update({
                rut: req.body.rut,
                nombres: req.body.nombres,
                apellido_mat: req.body.apellido_mat,
                apellido_pat: req.body.apellido_pat,
                activo: true,
                id_rol: req.body.id_rol
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

function eliminarPersona(req, res) {
    persona.findOne({
        where: {
            id_persona: req.body.id_persona
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
    getPersonas,
    crearPersona,
    editarPersona,
    eliminarPersona,
    getDetalleAlumno
}