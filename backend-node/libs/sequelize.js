const { Sequelize } = require('sequelize');
const config = require('../config/_config.js');
const { setupModels } = require('../db/models/index.js');

const sequelize = new Sequelize(config.dbName, config.user, config.password, {
  host: 'localhost',
  dialect: 'mysql'
});


setupModels(sequelize);

module.exports = sequelize;
