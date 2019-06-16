require('dotenv').config();

export const config = {
  development: {
    username: 'songc',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'songc',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'songc',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'songc',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
};
