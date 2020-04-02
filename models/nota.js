const Sequelize = require('sequelize');
const db = require('../config/connection');
const evaluacion = require('./evaluacion');
const persona = require('./persona');

const nota = db.define('nota', {
    id_nota: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    puntaje: Sequelize.INTEGER,
    activo: Sequelize.BOOLEAN,
    id_evaluacion: {
        type: Sequelize.INTEGER,
        references: {
            model: evaluacion,
            key: 'id_evaluacion'
        }
    },
    id_alumno: {
        type: Sequelize.INTEGER,
        references: {
            model: persona,
            key: 'id_persona'
        }
    }
}, {
    schema: 'public',
    createdAt: 'fecha_hora_registro',
    updatedAt: 'fecha_hora_edicion',
    id: false,
    freezeTableName: true,
    sync: {
        force: false
    }
});






module.exports = nota;