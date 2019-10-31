require('dotenv').config();

export const config = {
  development: {
    username: 'song',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'song',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'song',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'song',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
  }
};
