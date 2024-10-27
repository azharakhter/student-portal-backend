require('dotenv').config({ path: '../../.env' });

module.exports = {
  development: {
    replication: {
      read: [
        {
          username: process.env.DB_USERNAME || 'root',
          password: process.env.DB_PASSWORD || '',
          database: process.env.DB_NAME || 'student_hub',
          host: process.env.DB_HOST || 'host.docker.internal', // Default for Docker
        }
      ],
      write: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'student_hub',
        host: process.env.DB_HOST || 'host.docker.internal', // Default for Docker
      }
    },
    port: +(process.env.DATABASE_PORT) || 3306,
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
