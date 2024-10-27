require('dotenv').config({ path: '../../.env' });
module.exports = {
  development: {
    replication: {
      read: [
        {
          username: 'root',
          password: '',
          database: 'student_hub',
          host: 'localhost',
        }
      ],
      write: {
        username: 'root',
        password: '',
        database: 'student_hub',
        host: 'localhost',
      }
    },
    port: +(process.env.DATABASE_PORT),
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 30,
      idle: 30000,
      evict: 10000,
      acquire: 60000,
    }
  },
};
