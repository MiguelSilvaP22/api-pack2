const Sequelize = require('sequelize');
const db = require('../config/connection');
const persona = require('./persona');
const curso = require('./curso');

const alumno_curso = db.define('alumno_curso', {
    id_alumno_curso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
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




module.exports = alumno_curso;