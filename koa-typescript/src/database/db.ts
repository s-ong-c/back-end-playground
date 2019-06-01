import { Sequelize } from 'sequelize-typescript';
import * as  pg from 'pg';
import { Config } from '../../config/index';

pg.defaults.parseInt8 = true; // fixes numbers returning as string
//const { COCKROACHDB_HOST, COCKROACHDB_PW } = process.env;

// const db:Sequelize = new Sequelize('song', 'song',COCKROACHDB_PW, {
//   host: COCKROACHDB_HOST,
//   dialect: 'postgres',
//   port: 26257,
//   logging: true,
//   ssl: true,
//   dialectOptions: {
//     ssl: true,
//   },
// });

const db:Sequelize =  new Sequelize({
    database: 'mytestdb',
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    ssl: true,
});
export default db;