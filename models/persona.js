const Sequelize = require('sequelize');
const db = require('../config/connection');
const rol = require('./rol');


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
    activo: Sequelize.BOOLEAN
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



persona.belongsTo(rol, {foreignKey: {
    name: 'id_rol',
    allowNull: false
  }})

module.exports = persona;