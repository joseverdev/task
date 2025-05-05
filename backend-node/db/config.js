const config = require('../config/_config.js');

module.exports = {
  development: {
    username: config.user,
    password: config.password,
    database: config.dbName,
    host: config.host,
    dialect: 'mysql'
  }
}