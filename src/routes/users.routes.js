import express from 'express';
import RequestLoggerMiddleWare from '../utils/middleware/request-logger';
import authenticateJWT from '../utils/middleware/authenticate';

const usersRouter = express.Router();
const { UserController } = require('../controllers');

usersRouter.post('/signup', (...args) => UserController.createUser(...args), RequestLoggerMiddleWare.logger);

usersRouter.post('/login', (...args) => UserController.LoginUser(...args), RequestLoggerMiddleWare.logger);

usersRouter.get('/get-user', authenticateJWT, (...args) => UserController.getUser(...args), RequestLoggerMiddleWare.logger);
usersRouter.put('/update-user',authenticateJWT, (...args) => UserController.updateUser(...args), RequestLoggerMiddleWare.logger);


module.exports = usersRouter;

