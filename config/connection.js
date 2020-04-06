
const Sequelize = require('sequelize');
const config = require('./database');

// Configuracion inicial de la base de datos (los parametros se encuentran en el archivo database)
module.exports = new Sequelize(config.data_base, config.user, config.pass, {
    host: config.host,
    port: config.port,
    dialect: 'postgres',
    schema: config.schema,
    dialectOptions: { 
      useUTC: true,
    },
    timezone: "America/Santiago",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
})