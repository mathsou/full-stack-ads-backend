// Update with your config settings.
require('dotenv').config();
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '2808',
      database: 'library'
    },
    pool: { min: 0, max: 7 },
    useNullAsDefault: true,
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME
    },
    pool: { min: 0, max: 7 },
    useNullAsDefault: true,
  }
};
