require('dotenv').config({ path: '../../.env' });

// module.exports = {
//   development: {
//     replication: {
//       read: [
//         {
//           username:'admin',
//           password:'Fbazhar123',
//           database:'student_hub',
//           host:'database-1.cly6ssugetpt.us-west-2.rds.amazonaws.com', // Default for Docker
//         }
//       ],
//       write: {
//           username:'admin',
//           password:'Fbazhar123',
//           database:'student_hub',
//           host:'database-1.cly6ssugetpt.us-west-2.rds.amazonaws.com', // Default for Docker
//       }
//     },
//     port: +(process.env.PORT) || 3306,
//     dialect: 'mysql',
//     logging: false,
//     pool: {
//       max: 30,
//       idle: 30000,
//       evict: 10000,
//       acquire: 120000, // Increased timeout
//     }
//   },
// };

module.exports = {
  development: {
    username: 'admin',
    password: 'admin123',
    database: 'student_hub',
    host: 'database-1.cly6ssugetpt.us-west-2.rds.amazonaws.com',
    dialect: 'mysql',
    port: 3306,
    logging: false,
    pool: {
      max: 30,
      idle: 30000,
      evict: 10000,
      acquire: 120000,
    },
  },
};

