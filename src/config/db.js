const knex = require('knex');
const { db } = require('./env');

const knexInstance = knex({
  client: 'mysql2',
  connection: {
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.name,
    port: db.port,
  },
  pool: { min: 0, max: 10 },
});

module.exports = knexInstance;
