const Sequelize = require('sequelize');
const db = require('../config/connection');
const curso = require('./curso');

const evaluacion = db.define('evaluacion', {
    id_evaluacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: Sequelize.STRING,
    fecha_evaluacion: Sequelize.DATE,
    activo: Sequelize.BOOLEAN,
    id_curso: {
        type: Sequelize.INTEGER,
        references: {
            model: curso,
            key: 'id_curso'
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









module.exports = evaluacion;