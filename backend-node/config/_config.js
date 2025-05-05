require('dotenv/config');

const config = {
  env: 'dev',
  port: process.env.PORT || 3306,
  host: process.env.HOST || 'localhost',
  dbName: process.env.DB_NAME || 'my_todo_task',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'jose',
  dialect: process.env.DB_DIALECT || 'mysql',
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
}

module.exports = config;