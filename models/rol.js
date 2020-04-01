const Sequelize = require('sequelize');
const db = require('../config/connection');


const rol = db.define('rol', {
    id_rol: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    glosa: Sequelize.STRING,
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

rol.associate = models => {
    dau.belongsTo(models.persona, {foreignKey: 'id_rol'})
}

module.exports = rol;