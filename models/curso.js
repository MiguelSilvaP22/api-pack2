const Sequelize = require('sequelize');
const db = require('../config/connection');
const persona = require('./persona');
const alumno_curso = require('./alumno_curso');

const curso = db.define('curso', {
    id_curso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_curso: Sequelize.STRING,
    fecha_inicio: Sequelize.DATE,
    fecha_fin: Sequelize.DATE,
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



curso.belongsTo(persona, {as: 'profesor', foreignKey: {
    name: 'id_profesor',
    allowNull: false
  }})

  curso.hasMany(alumno_curso, { foreignKey: {
    name: 'id_curso',
    allowNull: false
  }})

module.exports = curso;