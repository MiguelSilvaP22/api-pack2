const Sequelize = require('sequelize');
const db = require('../config/connection');


/*
  -- DETALLE --
  perfil 1 --> PROFESOR
  perfil 2 --> ALUMNO

*/

const persona = db.define('persona', {
    id_persona: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rut: Sequelize.STRING,
    nombres: Sequelize.STRING,
    apellido_mat: Sequelize.STRING,
    apellido_pat: Sequelize.STRING,
    activo: Sequelize.BOOLEAN,

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






module.exports = persona;