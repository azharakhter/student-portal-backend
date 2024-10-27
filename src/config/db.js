import dotenv from 'dotenv';

import Sequelize from 'sequelize';

dotenv.config({ path: '.env' });

const config = require('./config')[process.env.NODE_ENV];

const db = config.use_env_variable
    ? new Sequelize(process.env[config.use_env_variable], config)
    : new Sequelize(config.database, config.username, config.password, config);

module.exports = db;
